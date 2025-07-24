const express = require('express');
const router = express.Router();
require('dotenv').config();
const { VoiceResponse } = require('twilio').twiml;
const { Campaign, CampaignMapping, User, BillingRule, CallLog, BillingLog, Number } = global.db.models;
const BASE_URL = process.env.BASE_URL;
const sequelize = global.db.sequelizeConfig;

// Helper to get buyers with conversion rates
async function getBuyersWithStats(campaignId) {
  const buyers = await CampaignMapping.findAll({
    where: { campaign_id: campaignId },
    include: [{
      model: User,
      as: 'buyer',
      where: { role: 'buyer' },
      attributes: ['id', 'name', 'phone']
    }],
    attributes: ['id']
  });

  console.log("Buyers with stats:", buyers.map(b => b.toJSON()));

  return Promise.all(buyers.map(async mapping => {
    const stats = await CallLog.findOne({
      where: { buyer_id: mapping.buyer.id },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalCalls'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN duration_sec >= 20 THEN 1 ELSE 0 END')), 'convertedCalls']
      ],
      raw: true
    });

    return {
      id: mapping.id,
      name: mapping.buyer.name,
      number: mapping.buyer.phone,
      totalCalls: stats.totalCalls || 0,
      convertedCalls: stats.convertedCalls || 0,
      conversionRate: stats.totalCalls > 0 ? stats.convertedCalls / stats.totalCalls : 0
    };
  }));
}

// POST /inbound-call
router.post("/inbound-call", async (req, res) => {
  const toNumber = req.body.To;
  const fromNumber = req.body.From;
  const response = new VoiceResponse();

  try {
    // Find campaign with this number and smart routing
    console.log("number" , toNumber)
    const number = await Number.findOne({ where: { number: toNumber }, attributes: ['id'] });
    console.log("number", number)
    if (!number) {
      response.say("Sorry, this number is not active for calls please try another number.");
      return res.type("text/xml").send(response.toString());
    }

    const numberId = number.id;

    // Find campaign with smart routing
    const campaign = await Campaign.findOne({
      where: { number_id: number.id, routing_method: 'smart' },
      include: [
        {
          model: global.db.models.CampaignMapping,
          as: 'buyer_mappings',
          required: false,
          include: [{
            model: global.db.models.User,
            as: 'buyer',
            attributes: ['id', 'name', 'phone'],
            where: { role: 'buyer' }
          }],
        }
      ],
    });


    console.log("campaign:", campaign ? campaign.toJSON() : "Not found");

    if (!campaign) {
      response.say("Sorry, this number is not active for calls.");
      return res.type("text/xml").send(response.toString());
    }

    // Get buyers with their stats
    const buyers = await getBuyersWithStats(campaign.id);
    if (!buyers.length) {
      response.say("No buyers available for this campaign.");
      return res.type("text/xml").send(response.toString());
    }

    // Sort by conversion rate (highest first)
    const sortedBuyers = [...buyers].sort((a, b) => b.conversionRate - a.conversionRate);
    const currentBuyer = sortedBuyers[0];

    console.log("Sorted buyers:", sortedBuyers.map(b => `${b.name} (${b.number}) - CR: ${b.conversionRate.toFixed(2)}`));

    console.log(`📞 Incoming from ${fromNumber} to ${toNumber}`);

    console.log(`🔁 Trying ${currentBuyer.name} (${currentBuyer.number})`);


    // Store buyer list in memory for this call
    global.activeCalls[fromNumber] = {
      campaignId: campaign.id,
      buyers: sortedBuyers,
      currentStep: 0
    };

    // Initiate call to first buyer
    response.say("Please hold while we connect your call.");
    const dial = response.dial({
      timeout: 20,
      action: `${BASE_URL}/call/dial-status?from=${encodeURIComponent(fromNumber)}`,
      callerId: toNumber,
      record: 'record-from-answer-dual',
      recordingStatusCallback: `${BASE_URL}/call/recording-complete`,
      recordingStatusCallbackMethod: "POST"
    });

    dial.number({
      statusCallback: `${BASE_URL}/call/call-complete`,
      statusCallbackMethod: "POST",
      statusCallbackEvent: ["completed"]
    }, currentBuyer.number);

    res.type("text/xml").send(response.toString());

  } catch (error) {
    console.error("Inbound call error:", error);
    response.say("Sorry, we're experiencing technical difficulties.");
    res.type("text/xml").send(response.toString());
  }
});

// POST /dial-status
router.post("/dial-status", async (req, res) => {
  const fromNumber = req.query.from;
  const status = req.body.DialCallStatus;
  const response = new VoiceResponse();

  try {
    const callData = global.activeCalls[fromNumber];
    if (!callData) {
      response.say("Call session expired. Please call again.");
      return res.type("text/xml").send(response.toString());
    }

    // If call was answered, end the flow
    if (status === "answered" || status === "completed") {
      delete global.activeCalls[fromNumber];
      return res.type("text/xml").send(response.toString());
    }

    // Try next buyer
    callData.currentStep += 1;
    if (callData.currentStep >= callData.buyers.length) {
      response.say("Sorry, no buyers are available right now.");
      delete global.activeCalls[fromNumber];
      return res.type("text/xml").send(response.toString());
    }

    const nextBuyer = callData.buyers[callData.currentStep];
    response.say("Connecting you to the next available buyer.");
    const dial = response.dial({
      timeout: 20,
      action: `${BASE_URL}/call/dial-status?from=${encodeURIComponent(fromNumber)}`,
      callerId: req.body.To,
      record: 'record-from-answer-dual',
      recordingStatusCallback: `${BASE_URL}/call/recording-complete`,
      recordingStatusCallbackMethod: "POST"
    });

    dial.number({
      statusCallback: `${BASE_URL}/call/call-complete`,
      statusCallbackMethod: "POST",
      statusCallbackEvent: ["completed"]
    }, nextBuyer.number);

    res.type("text/xml").send(response.toString());

  } catch (error) {
    console.error("Dial status error:", error);
    response.say("Error transferring your call.");
    res.type("text/xml").send(response.toString());
  }
});

// POST /call-complete
router.post("/call-complete", async (req, res) => {
  const { CallSid, CallDuration, To, From, CallStatus } = req.body;
  const duration = parseInt(CallDuration || "0");

  try {
    // Find buyer by phone number
    const buyer = await User.findOne({ where: { phone: To, role: 'buyer' } });
    if (!buyer) {
      console.error("Buyer not found for number:", To);
      return res.sendStatus(200);
    }

    // Find campaign from active calls or by called number
    let campaignId;
    if (global.activeCalls[From]) {
      campaignId = global.activeCalls[From].campaignId;
      delete global.activeCalls[From];
    } else {
      const buyerNumber = await User.findOne({ where: { phone: To } });
      if (!buyerNumber) {
        console.error("Number not found for:", To);
        return res.sendStatus(200);
      }

      const numberId = buyerNumber.id;
      console.log("Number ID:", numberId);
      const campaign = await CampaignMapping.findOne({ where: { buyer_id: numberId }, attributes: ['campaign_id'] });
      campaignId = campaign?.campaign_id;
      console.log("Campaign ID from number:", campaignId);
    }

    // Create call log
    const callLog = await CallLog.create({
      call_sid: CallSid,
      campaign_id: campaignId,
      buyer_id: buyer.id,
      caller_number: From,
      duration_sec: duration,
      status: CallStatus,
      is_converted: duration >= 20
    });

    // Check for billing if call was answered and meets duration
    if (CallStatus === 'completed' && duration > 0 && campaignId) {
      const billingRule = await BillingRule.findOne({
        where: { campaign_id: campaignId }
      });

      if (billingRule && duration >= billingRule.min_duration_sec) {
        const amount = (duration / 60) * billingRule.rate_per_min;
        await BillingLog.create({
          call_log_id: callLog.id,
          rule_id: billingRule.id,
          amount_charged: amount,
          duration_sec: duration
        });
        console.log(`💰 Billed $${amount.toFixed(4)} for ${duration}s call`);
      }
    }

    res.sendStatus(200);

  } catch (error) {
    console.error("Call complete error:", error);
    res.sendStatus(500);
  }
});

// POST /recording-complete
router.post("/recording-complete", async (req, res) => {
  const { CallSid, RecordingUrl, RecordingDuration } = req.body;

  try {
    await CallLog.update({
      recording_url: RecordingUrl + ".mp3",
      recording_duration: RecordingDuration
    }, {
      where: { call_sid: CallSid }
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Recording complete error:", error);
    res.sendStatus(500);
  }
});

// GET /inbound-call-logs
router.get("/inbound-call-logs", async (req, res) => {
  try {
    const logs = await CallLog.findAll({
      include: [
        { model: User, as: 'buyer', attributes: ['name', 'phone'] },
        { model: Campaign, attributes: ['name'] }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(logs);
  } catch (error) {
    console.error("Error fetching call logs:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

router.get("/billing-logs", async (req, res) => {
  try {
    const logs = await BillingLog.findAll({
      include: [
        {
          model: CallLog,
          as: 'call_log',
          attributes: ['buyer_id', 'duration_sec', 'caller_number', 'status'],
          include:[
            {
              model: Campaign,
              as: 'campaign',
              attributes: ['name']
            },
            {
              model: User,
              as: 'buyer',
              attributes: ['name', 'phone']
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(logs);
  } catch (error) {
    console.error("Error fetching billing logs:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

// Initialize in-memory call tracking
global.activeCalls = {};

module.exports = router;


// const express = require('express');
// const router = express.Router();
// require('dotenv').config();
// const { Telnyx } = require('telnyx');
// const axios = require('axios');
// const twilio = require('twilio');
// const { VoiceResponse } = twilio.twiml;

// const BASE_URL = process.env.BASE_URL;

// const buyerMap = {
//   "+17869775757": [
//     { name: "Buyer A", number: "+919150389617" },
//     { name: "Buyer B", number: "+919080915348" },
//     { name: "Buyer C", number: "+17869250365" },
//   ],
// };

// const buyerStats = {
//   "+919150389617": { totalCalls: 0, convertedCalls: 0 },
//   "+919080915348": { totalCalls: 0, convertedCalls: 0 },
//   "+17869250365": { totalCalls: 0, convertedCalls: 0 },
// };

// const callLogs = [];
// const callSidToMeta = {};

// function getConversionRate(buyerNumber) {
//   const stats = buyerStats[buyerNumber];
//   if (!stats || stats.totalCalls === 0) return 0;
//   return stats.convertedCalls / stats.totalCalls;
// }

// // POST /inbound-call
// router.post("/inbound-call", (req, res) => {
//   const toNumber = req.body.To;
//   const fromNumber = req.body.From;
//   const buyers = buyerMap[toNumber];
//   const response = new VoiceResponse();

//   console.log("📞 Inbound Call Received");

//   console.log("From:", fromNumber);

//   console.log("Incoming Call To:", toNumber);
// console.log("All Buyers:", buyers);
//   if (!buyers || buyers.length === 0) {
//     response.say("Sorry, this number is not assigned to any buyer.");
//     return res.type("text/xml").send(response.toString());
//   }

//   const sortedBuyers = [...buyers].sort(
//     (a, b) => getConversionRate(b.number) - getConversionRate(a.number)
//   );

//   console.log("sortedBuyers:", sortedBuyers);

//   buyerMap[`call-${fromNumber}`] = sortedBuyers;
//   const currentBuyer = sortedBuyers[0];

//   console.log(`📞 Incoming from ${fromNumber} to ${toNumber}`);
//   console.log(`🔁 Trying ${currentBuyer.name} (${currentBuyer.number})`);

//   response.say("Please hold while we connect your call.");

//   const dial = response.dial({
//     timeout: 20,
//     action: `${BASE_URL}/call/dial-status?step=0&twilioNumber=${encodeURIComponent(toNumber)}&from=${encodeURIComponent(fromNumber)}`,
//     callerId: toNumber,
//     record: 'record-from-answer-dual',
//     recordingStatusCallback: `${BASE_URL}/call/recording-complete`,
//     recordingStatusCallbackMethod: "POST"
//   });

//   dial.number({
//   statusCallback: `${BASE_URL}/call/call-complete`,
//   statusCallbackMethod: "POST",
//   statusCallbackEvent: ["completed"]
// }, currentBuyer.number);

//   res.type("text/xml").send(response.toString());
// });

// // POST /dial-status
// router.post("/dial-status", (req, res) => {
//   const step = parseInt(req.query.step);
//   const twilioNumber = req.query.twilioNumber;
//   const fromNumber = req.query.from;
//   const status = req.body.DialCallStatus;

//   const sortedBuyers = buyerMap[`call-${fromNumber}`];
//   const response = new VoiceResponse();

//   if (status === "answered" || status === "completed") {
//     console.log(`✅ Call connected to ${sortedBuyers[step].name}`);
//     return res.type("text/xml").send(response.toString());
//   }

//   if (step + 1 >= sortedBuyers.length) {
//     response.say("Sorry, no agents are available to take your call right now.");
//     return res.type("text/xml").send(response.toString());
//   }

//   const nextBuyer = sortedBuyers[step + 1];
//   console.log(`🔁 Trying next: ${nextBuyer.name} (${nextBuyer.number})`);

//   response.say("Transferring you to the next available agent.");
//   const dial = response.dial({
//     timeout: 20,
//     action: `${BASE_URL}/call/dial-status?step=${step + 1}&twilioNumber=${encodeURIComponent(twilioNumber)}&from=${encodeURIComponent(fromNumber)}`,
//     callerId: twilioNumber,
//     record: 'record-from-answer-dual',
//     recordingStatusCallback: `${BASE_URL}/call/recording-complete`,
//     recordingStatusCallbackMethod: "POST"
//   });

//   dial.number({
//     statusCallback: `${BASE_URL}/call/call-complete`,
//     statusCallbackMethod: "POST",
//     statusCallbackEvent: ["completed"]
//   }, nextBuyer.number);

//   res.type("text/xml").send(response.toString());
// });

// // POST /call-complete
// router.post("/call-complete", (req, res) => {
//   const callSid = req.body.CallSid;
//   const callStatus = req.body.CallStatus;
//   const duration = parseInt(req.body.CallDuration || "0");
//   const buyerNumber = req.body.To;
//   const fromNumber = req.body.From;

//   console.log("📋 Call Summary:");
//   console.log("From:", fromNumber);
//   console.log("To (Buyer):", buyerNumber);
//   console.log("Status:", callStatus);
//   console.log("Duration:", duration, "sec");

//   if (!buyerStats[buyerNumber]) {
//     buyerStats[buyerNumber] = { totalCalls: 0, convertedCalls: 0 };
//   }

//   buyerStats[buyerNumber].totalCalls += 1;

//   if (duration >= 20) {
//     buyerStats[buyerNumber].convertedCalls += 1;
//     const cost = (duration / 60) * 0.06;
//     console.log(`💰 Billable conversion ($${cost.toFixed(2)})`);
//   } else {
//     console.log("❌ Not a billable conversion.");
//   }

//   console.log("📈 Updated buyerStats:", buyerStats);

//   callSidToMeta[callSid] = {
//     buyer: buyerNumber,
//     user: fromNumber
//   };

//   res.type("text/xml").send(new VoiceResponse().toString());
// });

// // POST /recording-complete
// router.post("/recording-complete", (req, res) => {
//   const {
//     CallSid,
//     RecordingUrl,
//     RecordingDuration,
//     RecordingSid
//   } = req.body;

//   const meta = callSidToMeta[CallSid] || {};
//   const log = {
//     callSid: CallSid,
//     buyer: meta.buyer || "unknown",
//     user: meta.user || "unknown",
//     recordingUrl: RecordingUrl + ".mp3",
//     duration: RecordingDuration,
//     recordingSid: RecordingSid,
//     timestamp: new Date().toISOString()
//   };

//   callLogs.push(log);
//   delete callSidToMeta[CallSid];

//   console.log("📼 Recording saved:", log);
//   res.sendStatus(200);
// });

// // GET /inbound-call-logs
// router.get("/inbound-call-logs", (req, res) => {
//   res.json(callLogs);
// });

// module.exports = router;
