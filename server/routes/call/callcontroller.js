const express = require('express');
const router = express.Router();
require('dotenv').config();
const { Telnyx } = require('telnyx');
const axios = require('axios');
const twilio = require('twilio');
const { VoiceResponse } = twilio.twiml;

const BASE_URL = process.env.BASE_URL;

const buyerMap = {
  "+17869775757": [
    { name: "Buyer A", number: "+919150389617" },
    { name: "Buyer B", number: "+919080915348" },
    { name: "Buyer C", number: "+17869250365" },
  ],
};

const buyerStats = {
  "+919150389617": { totalCalls: 0, convertedCalls: 0 },
  "+919080915348": { totalCalls: 0, convertedCalls: 0 },
  "+17869250365": { totalCalls: 0, convertedCalls: 0 },
};

const callLogs = [];
const callSidToMeta = {};

function getConversionRate(buyerNumber) {
  const stats = buyerStats[buyerNumber];
  if (!stats || stats.totalCalls === 0) return 0;
  return stats.convertedCalls / stats.totalCalls;
}

// POST /inbound-call
router.post("/inbound-call", (req, res) => {
  const toNumber = req.body.To;
  const fromNumber = req.body.From;
  const buyers = buyerMap[toNumber];
  const response = new VoiceResponse();

  console.log("📞 Inbound Call Received");

  console.log("From:", fromNumber);

  console.log("Incoming Call To:", toNumber);
console.log("All Buyers:", buyers);
  if (!buyers || buyers.length === 0) {
    response.say("Sorry, this number is not assigned to any buyer.");
    return res.type("text/xml").send(response.toString());
  }

  const sortedBuyers = [...buyers].sort(
    (a, b) => getConversionRate(b.number) - getConversionRate(a.number)
  );

  console.log("sortedBuyers:", sortedBuyers);

  buyerMap[`call-${fromNumber}`] = sortedBuyers;
  const currentBuyer = sortedBuyers[0];

  console.log(`📞 Incoming from ${fromNumber} to ${toNumber}`);
  console.log(`🔁 Trying ${currentBuyer.name} (${currentBuyer.number})`);

  response.say("Please hold while we connect your call.");

  const dial = response.dial({
    timeout: 20,
    action: `${BASE_URL}/call/dial-status?step=0&twilioNumber=${encodeURIComponent(toNumber)}&from=${encodeURIComponent(fromNumber)}`,
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
});

// POST /dial-status
router.post("/dial-status", (req, res) => {
  const step = parseInt(req.query.step);
  const twilioNumber = req.query.twilioNumber;
  const fromNumber = req.query.from;
  const status = req.body.DialCallStatus;

  const sortedBuyers = buyerMap[`call-${fromNumber}`];
  const response = new VoiceResponse();

  if (status === "answered" || status === "completed") {
    console.log(`✅ Call connected to ${sortedBuyers[step].name}`);
    return res.type("text/xml").send(response.toString());
  }

  if (step + 1 >= sortedBuyers.length) {
    response.say("Sorry, no agents are available to take your call right now.");
    return res.type("text/xml").send(response.toString());
  }

  const nextBuyer = sortedBuyers[step + 1];
  console.log(`🔁 Trying next: ${nextBuyer.name} (${nextBuyer.number})`);

  response.say("Transferring you to the next available agent.");
  const dial = response.dial({
    timeout: 20,
    action: `${BASE_URL}/call/dial-status?step=${step + 1}&twilioNumber=${encodeURIComponent(twilioNumber)}&from=${encodeURIComponent(fromNumber)}`,
    callerId: twilioNumber,
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
});

// POST /call-complete
router.post("/call-complete", (req, res) => {
  const callSid = req.body.CallSid;
  const callStatus = req.body.CallStatus;
  const duration = parseInt(req.body.CallDuration || "0");
  const buyerNumber = req.body.To;
  const fromNumber = req.body.From;

  console.log("📋 Call Summary:");
  console.log("From:", fromNumber);
  console.log("To (Buyer):", buyerNumber);
  console.log("Status:", callStatus);
  console.log("Duration:", duration, "sec");

  if (!buyerStats[buyerNumber]) {
    buyerStats[buyerNumber] = { totalCalls: 0, convertedCalls: 0 };
  }

  buyerStats[buyerNumber].totalCalls += 1;

  if (duration >= 20) {
    buyerStats[buyerNumber].convertedCalls += 1;
    const cost = (duration / 60) * 0.06;
    console.log(`💰 Billable conversion ($${cost.toFixed(2)})`);
  } else {
    console.log("❌ Not a billable conversion.");
  }

  console.log("📈 Updated buyerStats:", buyerStats);

  callSidToMeta[callSid] = {
    buyer: buyerNumber,
    user: fromNumber
  };

  res.type("text/xml").send(new VoiceResponse().toString());
});

// POST /recording-complete
router.post("/recording-complete", (req, res) => {
  const {
    CallSid,
    RecordingUrl,
    RecordingDuration,
    RecordingSid
  } = req.body;

  const meta = callSidToMeta[CallSid] || {};
  const log = {
    callSid: CallSid,
    buyer: meta.buyer || "unknown",
    user: meta.user || "unknown",
    recordingUrl: RecordingUrl + ".mp3",
    duration: RecordingDuration,
    recordingSid: RecordingSid,
    timestamp: new Date().toISOString()
  };

  callLogs.push(log);
  delete callSidToMeta[CallSid];

  console.log("📼 Recording saved:", log);
  res.sendStatus(200);
});

// GET /inbound-call-logs
router.get("/inbound-call-logs", (req, res) => {
  res.json(callLogs);
});

module.exports = router;
