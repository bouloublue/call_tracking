const express = require("express");
const router = express.Router();
const { BillingRule } = global.db.models;

router.get('/rules', async (req, res) => {
  try {
    const { campaign_id } = req.query;
    const rules = await BillingRule.findAll({ where: { campaign_id } });
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/rules', async (req, res) => {
  try {
    const rule = await BillingRule.create(req.body);
    res.status(201).json(rule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/rules/:id', async (req, res) => {
  try {
    await BillingRule.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Updated Billing Logs Endpoint
router.get('/billing/logs', async (req, res) => {
  try {
    const logs = await BillingLog.findAll({
      include: [{
        model: CallLog,
        attributes: ['caller_number', 'campaign_id'], // Include caller_number and campaign_id
        as: 'call_log' // Make sure this matches your association alias
      }],
      order: [['created_at', 'DESC']],
      limit: 100
    });
    
    // Format the response to include caller_number directly
    const formattedLogs = logs.map(log => ({
      ...log.toJSON(),
      caller_number: log.call_log?.caller_number || null
    }));
    
    res.json(formattedLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;