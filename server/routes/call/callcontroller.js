const express = require("express");
const router = express.Router();
require("dotenv").config();
const { VoiceResponse } = require("twilio").twiml;
const {
  Campaign,
  CampaignMapping,
  User,
  BillingRule,
  CallLog,
  BillingLog,
  Number,
} = global.db.models;
const BASE_URL = process.env.BASE_URL;
const sequelize = global.db.sequelizeConfig;
const authMiddleware = require("../../middlewares/auth");
const { Op, fn, col } = require("sequelize");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const axios = require("axios");
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Helper to get buyers with conversion rates
async function getBuyersWithStats(campaignId) {
  const buyers = await CampaignMapping.findAll({
    where: { campaign_id: campaignId },
    include: [
      {
        model: User,
        as: "buyer",
        where: { role: "buyer" },
        attributes: ["id", "name", "phone"],
      },
    ],
    attributes: ["id"],
  });

  console.log(
    "Buyers with stats:",
    buyers.map((b) => b.toJSON())
  );

  return Promise.all(
    buyers.map(async (mapping) => {
      const stats = await CallLog.findOne({
        where: { buyer_id: mapping.buyer.id },
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("id")), "totalCalls"],
          [
            sequelize.fn(
              "SUM",
              sequelize.literal(
                "CASE WHEN duration_sec >= 20 THEN 1 ELSE 0 END"
              )
            ),
            "convertedCalls",
          ],
        ],
        raw: true,
      });

      return {
        id: mapping.id,
        name: mapping.buyer.name,
        number: mapping.buyer.phone,
        totalCalls: stats.totalCalls || 0,
        convertedCalls: stats.convertedCalls || 0,
        conversionRate:
          stats.totalCalls > 0 ? stats.convertedCalls / stats.totalCalls : 0,
      };
    })
  );
}

// POST /inbound-call
router.post("/inbound-call", async (req, res) => {
  const toNumber = req.body.To;
  const fromNumber = req.body.From;
  const response = new VoiceResponse();
  const callSid = req.body.CallSid;

  try {
    // Find campaign with this number and smart routing
    console.log("number", toNumber);
    const number = await Number.findOne({
      where: { number: toNumber },
      attributes: ["id"],
    });
    console.log("number", number);
    if (!number) {
      response.say(
        "Sorry, this number is not active for calls please try another number."
      );
      return res.type("text/xml").send(response.toString());
    }

    const numberId = number.id;

    // Find campaign with smart routing
    const campaign = await Campaign.findOne({
      where: { number_id: number.id, routing_method: "smart" },
      include: [
        {
          model: global.db.models.CampaignMapping,
          as: "buyer_mappings",
          required: false,
          include: [
            {
              model: global.db.models.User,
              as: "buyer",
              required: false,
              attributes: ["id", "name", "phone"],
              where: { role: "buyer" },
            },
          ],
        },
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
      response.say(
        "we are sorry, Currently No buyers are available for this campaign, Thank You"
      );
      return res.type("text/xml").send(response.toString());
    }

    // Sort by conversion rate (highest first)
    const sortedBuyers = [...buyers].sort(
      (a, b) => b.conversionRate - a.conversionRate
    );
    const currentBuyer = sortedBuyers[0];

    console.log(
      "Sorted buyers:",
      sortedBuyers.map(
        (b) => `${b.name} (${b.number}) - CR: ${b.conversionRate.toFixed(2)}`
      )
    );

    console.log(`📞 Incoming from ${fromNumber} to ${toNumber}`);

    console.log(`🔁 Trying ${currentBuyer.name} (${currentBuyer.number})`);

    // Store buyer list in memory for this call
    // global.activeCalls[fromNumber] = {
    //   campaignId: campaign.id,
    //   buyers: sortedBuyers,
    //   currentStep: 0,
    //   originalCaller: fromNumber,
    // };
    global.activeCalls[callSid] = {
      campaignId: campaign.id,
      buyers: sortedBuyers,
      currentStep: 0,
      originalCaller: fromNumber,
      parentCallSid: callSid, // This is the initial parent call
      childCallSids: [], // Will store all child call SIDs
      toNumber: toNumber,
    };

    // Initiate call to first buyer
    response.say("Please hold while we connect your call.");
    const dial = response.dial({
      timeout: 20,
      action: `${BASE_URL}/call/dial-status?parentCallSid=${encodeURIComponent(
        callSid
      )}`,
      callerId: toNumber,
      record: "record-from-answer-dual",
      recordingStatusCallback: `${BASE_URL}/call/recording-complete`,
      recordingStatusCallbackMethod: "POST",
    });

    dial.number(
      {
        statusCallback: `${BASE_URL}/call/call-complete?parentCallSid=${encodeURIComponent(
          callSid
        )}`,
        statusCallbackMethod: "POST",
        statusCallbackEvent: ["completed"],
      },
      currentBuyer.number
    );

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
  const parentCallSid = req.query.parentCallSid;
  const callSid = req.body.CallSid;
  const response = new VoiceResponse();

  try {
    const callData = global.activeCalls[parentCallSid];
    console.log("callData", callData);
    if (!callData) {
      response.say("Call session expired. Please call again.");
      return res.type("text/xml").send(response.toString());
    }

    // If call was answered, end the flow
    if (status === "answered" || status === "completed") {
      delete global.activeCalls[parentCallSid];
      return res.type("text/xml").send(response.toString());
    }

    if (callSid && !callData.childCallSids.includes(callSid)) {
      callData.childCallSids.push(callSid);
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
      action: `${BASE_URL}/call/dial-status?from=${encodeURIComponent(
        parentCallSid
      )}`,
      callerId: req.body.To,
      record: "record-from-answer-dual",
      recordingStatusCallback: `${BASE_URL}/call/recording-complete`,
      recordingStatusCallbackMethod: "POST",
    });

    dial.number(
      {
        statusCallback: `${BASE_URL}/call/call-complete`,
        statusCallbackMethod: "POST",
        statusCallbackEvent: ["completed"],
      },
      nextBuyer.number
    );

    res.type("text/xml").send(response.toString());
  } catch (error) {
    console.error("Dial status error:", error);
    response.say("Error transferring your call.");
    res.type("text/xml").send(response.toString());
  }
});

router.post("/call-complete", async (req, res) => {
  const { CallSid, ParentCallSid, CallDuration, To, From, CallStatus } =
    req.body;
  const parentCallSid = req.query.parentCallSid || ParentCallSid;
  console.log(req.body);
  const duration = parseInt(CallDuration || "0");

  try {
    let campaignId, buyerId;
    let callerNumber = From;

    // const session = global.activeCalls[From];
    // if (session) {
    //   campaignId = session.campaignId;
    //   buyerId = session.buyers[session.currentStep]?.id;
    //   callerNumber = session.originalCaller || From;
    //   delete global.activeCalls[From];
    // }

    const session =
      global.activeCalls[parentCallSid] ||
      Object.values(global.activeCalls).find((s) =>
        s.childCallSids?.includes(CallSid)
      );

    if (session) {
      campaignId = session.campaignId;
      buyerId = session.buyers[session.currentStep]?.id;
      callerNumber = session.originalCaller || From;

      // Remove this call from childCallSids if present
      if (session.childCallSids?.includes(CallSid)) {
        session.childCallSids = session.childCallSids.filter(
          (sid) => sid !== CallSid
        );
      }

      // Clean up session if no more child calls
      if (session.childCallSids?.length === 0) {
        delete global.activeCalls[session.parentCallSid];
      }
    }

    if (!buyerId) {
      const buyerNumber = await User.findOne({
        where: { phone: To, role: "buyer" },
      });

      if (!buyerNumber) {
        console.error("Buyer not found for number:", To);
        return res.sendStatus(200);
      }

      buyerId = buyerNumber.id;

      const campaign = await CampaignMapping.findOne({
        where: { buyer_id: buyerId },
        attributes: ["campaign_id"],
      });

      campaignId = campaign?.campaign_id;
    }

    if (!buyerId || !campaignId) {
      console.error("Missing buyer or campaign information");
      return res.sendStatus(200);
    }

    // Fetch Billing Rule to determine if the call is converted
    const billingRule = await BillingRule.findOne({
      where: { campaign_id: campaignId },
    });

    const minDuration = billingRule?.min_duration_sec || 20; // fallback to 20s if no rule

    // Save call log
    const callLog = await CallLog.create({
      call_sid: CallSid,
      parent_call_sid: parentCallSid,
      campaign_id: campaignId,
      buyer_id: buyerId,
      caller_number: callerNumber,
      duration_sec: duration,
      status: CallStatus,
      is_converted: duration >= minDuration,
    });

    // Billing logic
    if (
      CallStatus === "completed" &&
      duration > 0 &&
      billingRule &&
      duration >= billingRule.min_duration_sec
    ) {
      const amount = (duration / 60) * billingRule.rate_per_min;
      await BillingLog.create({
        call_log_id: callLog.id,
        rule_id: billingRule.id,
        amount_charged: amount,
        duration_sec: duration,
      });
      console.log(`💰 Billed $${amount.toFixed(4)} for ${duration}s call`);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Call complete error:", error);
    res.sendStatus(500);
  }
});

router.post("/recording-complete", async (req, res) => {
  console.log("🎙 Recording callback received:", req.body);
  const {
    CallSid,
    ParentCallSid,
    RecordingUrl,
    RecordingDuration,
    RecordingSid,
  } = req.body;

  try {
    // await CallLog.update(
    //   {
    //     recording_url: RecordingUrl + ".mp3",
    //     recording_duration: RecordingDuration,
    //   },
    //   {
    //     where: { call_sid: CallSid },
    //   }
    // );
    // res.sendStatus(200);
    let callLog = await CallLog.findOne({
      where: {
        [Op.or]: [
          { call_sid: ParentCallSid || CallSid },
          { parent_call_sid: ParentCallSid || CallSid },
        ],
      },
      order: [["created_at", "DESC"]],
    });

    // Fallback to find by original caller if needed
    if (!callLog) {
      const session = Object.values(global.activeCalls).find(
        (s) =>
          s.parentCallSid === (ParentCallSid || CallSid) ||
          s.childCallSids?.includes(CallSid)
      );

      if (session) {
        callLog = await CallLog.findOne({
          where: {
            caller_number: session.originalCaller,
            campaign_id: session.campaignId,
          },
          order: [["created_at", "DESC"]],
        });
      }
    }

    if (callLog) {
      await callLog.update({
        recording_url: RecordingUrl + ".mp3",
        recording_duration: RecordingDuration,
        recording_sid: RecordingSid,
      });
    } else {
      console.error("Call log not found for recording:", {
        CallSid,
        ParentCallSid,
        RecordingSid,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Recording complete error:", error);
    res.sendStatus(500);
  }
});

router.get("/:recordingSid", async (req, res) => {
  try {
    const { recordingSid } = req.params;

    if (!/^RE[0-9a-f]{32}$/.test(recordingSid)) {
      return res.status(400).json({ error: "Invalid recording SID format" });
    }

    const recordingUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Recordings/${recordingSid}.mp3`;

    const twilioResponse = await axios.get(recordingUrl, {
      responseType: "stream",
      auth: {
        username: TWILIO_ACCOUNT_SID,
        password: TWILIO_AUTH_TOKEN,
      },
    });

    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `inline; filename="recording-${recordingSid}.mp3"`,
      "Cache-Control": "private, max-age=3600",
      // Forward important headers for streaming
      ...(twilioResponse.headers["content-length"] && {
        "Content-Length": twilioResponse.headers["content-length"],
      }),
      "Accept-Ranges": "bytes",
    });

    twilioResponse.data.pipe(res);
  } catch (error) {
    console.error("Recording proxy error:", error.message);
    if (error.response?.status === 404) {
      return res.status(404).json({ error: "Recording not found" });
    }
    res
      .status(500)
      .json({ error: "Failed to fetch recording", details: error.message });
  }
});

router.get("/dashboard/metrics", async (req, res) => {
  try {
    // 1. Get live calls from Twilio API (status "in-progress")
    const liveCallsData = await twilio.calls.list({ status: "in-progress" });
    const liveCalls = liveCallsData.length;

    // 2. Count active campaigns from Campaign model
    const activeCampaigns = await Campaign.count({
      where: { is_active: true },
    });

    // 3. Count calls received today from CallLog model
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0);

    const callsReceivedLast30Days = await CallLog.count({
      where: { created_at: { [Op.gte]: startDate } },
    });

    // 4. Average call duration in seconds for completed calls
    const avgCallData = await CallLog.findOne({
      attributes: [[fn("AVG", col("duration_sec")), "avgDuration"]],
      where: {
        status: "completed",
        duration_sec: { [Op.gt]: 0 },
      },
      raw: true,
    });

    const avgSeconds = Math.round(avgCallData?.avgDuration || 0);
    const minutes = Math.floor(avgSeconds / 60);
    const seconds = avgSeconds % 60;
    const avgCallDuration = `${minutes}m ${seconds}s`;

    res.status(200).json({
      success: true,
      data: {
        activeCampaigns,
        liveCalls,
        callsReceivedLast30Days,
        avgCallDuration,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch dashboard metrics" });
  }
});

router.get("/:campaignId/stats", authMiddleware, async (req, res) => {
  try {
    const { campaignId } = req.params;
    const authUser = req.user;

    // Admin only (you can adjust logic to allow buyers with campaign access)
    if (authUser?.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Get all call logs for this campaign
    const callLogs = await CallLog.findAll({
      where: { campaign_id: campaignId },
      include: [
        {
          model: User,
          as: "buyer",
          attributes: ["id", "name", "phone"],
        },
        {
          model: BillingLog,
          as: "billing_logs",
          attributes: ["amount_charged"],
        },
      ],
    });

    // Compute stats
    const stats = {
      totalCalls: callLogs.length,
      connected: 0,
      droppedCalls: 0,
      converted: 0,
      totalBilledAmount: 0,
    };

    const buyersMap = new Map();

    for (const log of callLogs) {
      if (log.status === "completed") stats.connected++;
      else stats.droppedCalls++;

      if (log.is_converted) stats.converted++;

      const amount =
        log.billing_logs?.reduce(
          (sum, b) => sum + (b.amount_charged || 0),
          0
        ) || 0;
      stats.totalBilledAmount += amount;

      // Build unique buyer list
      if (log.buyer) {
        buyersMap.set(log.buyer.id, {
          id: log.buyer.id,
          name: log.buyer.name,
          phone: log.buyer.phone,
        });
      }
    }

    stats.conversionRate =
      stats.totalCalls > 0
        ? `${((stats.converted / stats.totalCalls) * 100).toFixed(2)}%`
        : "0%";

    return res.json({
      campaignId,
      stats,
      buyers: Array.from(buyersMap.values()),
    });
  } catch (error) {
    console.error("Error fetching campaign stats:", error);
    res.status(500).json({ error: "Failed to fetch campaign stats" });
  }
});

router.get("/inbound-call-logs", authMiddleware, async (req, res) => {
  try {
    const authUser = req.user;

    // Common query setup
    const includeOptions = [
      {
        model: Campaign,
        as: "campaign",
        attributes: ["name"],
      },
      {
        model: User,
        as: "buyer",
        attributes: ["id", "name", "phone"],
      },
    ];

    // If user is buyer
    if (authUser?.role === "buyer") {
      const callLogs = await CallLog.findAll({
        where: { buyer_id: authUser.id },
        include: [
          ...includeOptions,
          {
            model: BillingLog,
            as: "billing_logs",
            attributes: ["amount_charged"],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      // Stats for this buyer
      const connectedCalls = callLogs.filter(
        (log) => log.status === "completed"
      );
      const droppedCalls = callLogs.filter((log) => log.status !== "completed");
      // const notConnectedCalls = callLogs.filter(
      //   (log) => log.status !== "completed"
      // );
      const convertedCalls = callLogs.filter((log) => log.is_converted);
      const totalBilledAmount = callLogs.reduce((sum, log) => {
        const billedForThisCall = log.billing_logs?.reduce(
          (innerSum, bill) => innerSum + (bill.amount_charged || 0),
          0
        );
        return sum + billedForThisCall;
      }, 0);
      const conversionRate =
        callLogs.length > 0
          ? (convertedCalls.length / callLogs.length) * 100
          : 0;

      const user = await global.db.models.User.findByPk(authUser.id);

      return res.json({
        buyer: {
          id: user.id,
          name: user.name,
          phone: user.phone,
        },
        stats: {
          totalCalls: callLogs.length,
          connected: connectedCalls.length,
          // notConnected: notConnectedCalls.length,
          droppedCalls: droppedCalls.length,
          converted: convertedCalls.length,
          totalBilledAmount,
          conversionRate: `${conversionRate.toFixed(2)}%`,
        },
        callLogs,
      });
    }

    // If user is admin
    else if (authUser?.role === "admin") {
      const allCallLogs = await CallLog.findAll({
        include: [
          ...includeOptions,
          {
            model: BillingLog,
            as: "billing_logs",
            required: false,
            attributes: ["amount_charged"],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      // Group call logs by buyer
      const buyersMap = new Map();

      for (const log of allCallLogs) {
        const buyerId = log.buyer.id;
        if (!buyersMap.has(buyerId)) {
          buyersMap.set(buyerId, {
            buyer: {
              id: log.buyer.id,
              name: log.buyer.name,
              phone: log.buyer.phone,
              campaign: log?.campaign.name,
            },
            callLogs: [],
            stats: {
              totalCalls: 0,
              connected: 0,
              droppedCalls: 0,
              converted: 0,
              totalBilledAmount: 0,
            },
          });
        }

        const buyerData = buyersMap.get(buyerId);
        buyerData.callLogs.push(log);

        // Update stats
        buyerData.stats.totalCalls += 1;
        if (log.status === "completed") buyerData.stats.connected += 1;
        else buyerData.stats.droppedCalls += 1;
        if (log.is_converted) buyerData.stats.converted += 1;
        buyerData.stats.totalBilledAmount +=
          log.billing_logs?.reduce(
            (sum, b) => sum + (b.amount_charged || 0),
            0
          ) || 0;
      }

      // Calculate conversion rate per buyer
      for (const buyerData of buyersMap.values()) {
        const { converted, totalCalls } = buyerData.stats;
        buyerData.stats.conversionRate =
          totalCalls > 0
            ? `${((converted / totalCalls) * 100).toFixed(2)}%`
            : "0%";
      }

      // Return as array of buyer summaries
      return res.json(Array.from(buyersMap.values()));
    }

    // Default fallback
    res.status(403).json({ error: "Unauthorized access" });
  } catch (error) {
    console.error("Error fetching call logs:", error);
    res.status(500).json({ error: "Failed to fetch call logs" });
  }
});

router.get("/billing-logs", authMiddleware, async (req, res) => {
  try {
    const authUser = req.user;
    const {
      page = 1,
      limit = 10,
      buyer,
      campaign,
      dateFrom,
      dateTo,
    } = req.query;

    // Base query options
    const queryOptions = {
      include: [
        {
          model: CallLog,
          as: "call_log",
          where: {},
          attributes: ["buyer_id", "duration_sec", "caller_number", "status"],
          include: [
            {
              model: Campaign,
              as: "campaign",
              attributes: ["name"],
              ...(campaign && {
                where: {
                  name: {
                    [Op.like]: `%${campaign}%`,
                  },
                },
              }),
            },
            {
              model: User,
              as: "buyer",
              attributes: ["name", "phone"],
              ...(buyer && {
                where: {
                  name: {
                    [Op.like]: `%${buyer}%`,
                  },
                },
              }),
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
      distinct: true, // Important for correct counting with includes
    };

    // Date range filtering
    if (dateFrom || dateTo) {
      queryOptions.where = {
        created_at: {
          ...(dateFrom && { [Op.gte]: new Date(dateFrom) }),
          ...(dateTo && { [Op.lte]: new Date(dateTo) }),
        },
      };
    }

    // Buyer-specific filtering
    if (authUser?.role === "buyer") {
      queryOptions.include[0].where.buyer_id = authUser.id;
    }

    // Pagination
    const offset = (page - 1) * limit;
    const { count, rows } = await BillingLog.findAndCountAll({
      ...queryOptions,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      success: true,
      data: rows,
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("Error fetching billing logs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch logs",
    });
  }
});

global.activeCalls = {};

module.exports = router;
