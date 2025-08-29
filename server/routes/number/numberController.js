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

router.get("/", async (req, res) => {
  try {
    const numbers = await global.db.models.Number.findAll();
    res.status(200).json(numbers);
  } catch (err) {
    console.error("Error fetching numbers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const number = await global.db.models.Number.findByPk(id);

    if (!number) {
      return res.status(404).json({ error: "Number not found" });
    }

    res.status(200).json(number);
  } catch (err) {
    console.error("Error fetching number:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { number, friendly_name, type, status } = req.body;

    if (!number || !friendly_name || !type || !status) {
      return res.status(400).json({ error: "Missing required fields: number, friendly_name, type, and status" });
    }

    const existingNumber = await global.db.models.Number.findByPk(id);
    if (!existingNumber) {
      return res.status(404).json({ error: "Number not found" });
    }

    existingNumber.number = number;
    existingNumber.friendly_name = friendly_name;
    existingNumber.type = type;
    existingNumber.status = status;

    await existingNumber.save();

    res.status(200).json({
      message: "Number updated successfully",
      number: existingNumber,
    });
  } catch (err) {
    console.error("Error updating number:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const number = await global.db.models.Number.findByPk(id);

    if (!number) {
      return res.status(404).json({ error: "Number not found" });
    }

    await number.destroy();
    res.status(200).json({ message: "Number deleted successfully" });
  } catch (err) {
    console.error("Error deleting number:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
