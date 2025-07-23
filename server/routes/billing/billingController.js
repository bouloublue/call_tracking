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


module.exports = router;