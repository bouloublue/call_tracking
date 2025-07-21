const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    const { number, friendly_name, type, status } = req.body;

    if (!number || !friendly_name || !type || !status) {
      return res.status(400).json({ error: "Missing required fields: number, friendly_name, type, and status" });
    }

    // Assuming Number is a model similar to Campaign
    const existingNumber = await global.db.models.Number.findOne({
      where: { number },
    });

    if (existingNumber) {
      return res.status(409).json({ error: "Number already exists" });
    }

    // Create number with all fields
    const newNumber = await global.db.models.Number.create({ number, friendly_name, type, status });

    res.status(201).json({
      message: "Number created successfully",
      number: newNumber,
    });
  } catch (err) {
    console.error("Error creating number:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
