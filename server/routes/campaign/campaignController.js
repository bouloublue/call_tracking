const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const {csvUpload} = require("../../middlewares/upload")
const { Campaign, User, Form } = global.db.models;

// ✅ Create a Campaign
router.post("/", csvUpload.single("file"), async (req, res) => {
  try {
    const { name, user_id, client_id, form_id, import_lead_fields } = req.body;
    console.log(req.id)

    if (!name || !user_id || !client_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCampaign = await Campaign.create({
      name,
      user_id,
      client_id,
      form_id,
      import_lead_fields: import_lead_fields ? JSON.stringify(JSON.parse(import_lead_fields)) : null,
      file: req.file ? `/uploads/campaigns/${req.file.filename}` : null,
    });

    res.status(201).json({ message: "Campaign created", campaign: newCampaign });
  } catch (err) {
    console.error("Error uploading campaign:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Get All Campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      include: [
        {
          model: User,
          as: 'creator', // user_id
          required: false,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'client', // client_id
          required: false,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Form,
          required: false,
          attributes: ['id', 'name'],
        }
      ],
      order: [['created_at', 'DESC']],
    });

    const formatted = campaigns.map((campaign) => {
      const obj = campaign.toJSON();
      return {
        ...obj,
        import_lead_fields: typeof obj.import_lead_fields === 'string'
          ? JSON.parse(obj.import_lead_fields)
          : obj.import_lead_fields || [],
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Get Single Campaign by ID
router.get("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id, {
      include: [
        { model: User, as: "user" },
        { model: User, as: "client" },
        { model: Form },
      ],
    });

    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    const data = {
      ...campaign.toJSON(),
      import_lead_fields: campaign.import_lead_fields ? JSON.parse(campaign.import_lead_fields) : [],
    };

    res.json(data);
  } catch (err) {
    console.error("Error fetching campaign:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update Campaign
router.put("/:id", async (req, res) => {
  try {
    const { name, user_id, client_id, form_id, import_lead_fields, file } = req.body;

    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    campaign.name = name ?? campaign.name;
    campaign.user_id = user_id ?? campaign.user_id;
    campaign.client_id = client_id ?? campaign.client_id;
    campaign.form_id = form_id ?? campaign.form_id;
    campaign.import_lead_fields = import_lead_fields ? JSON.stringify(import_lead_fields) : campaign.import_lead_fields;
    campaign.file = file ?? campaign.file;

    await campaign.save();

    res.json({ message: "Campaign updated successfully", campaign });
  } catch (err) {
    console.error("Error updating campaign:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Soft Delete Campaign
router.delete("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    await campaign.destroy();
    res.json({ message: "Campaign deleted successfully" });
  } catch (err) {
    console.error("Error deleting campaign:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
