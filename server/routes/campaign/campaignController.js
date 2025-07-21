const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Campaign } = global.db.models;

router.post("/", async (req, res) => {
  try {
    const { name, country } = req.body;

    if (!name || !country) {
      return res.status(400).json({ error: "Missing required fields: name and country" });
    }

    const existingCampaign = await Campaign.findOne({
      where: { name },
    });

    if (existingCampaign) {
      return res.status(409).json({ error: "Campaign already exists" });
    }

    // Create campaign with only name and country
    const newCampaign = await Campaign.create({ name, country });

    res.status(201).json({
      message: "Campaign created successfully",
      campaign: newCampaign,
    });
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// router.get("/", async (req, res) => {
//   try {
//     const campaigns = await Campaign.findAll({
//       include: [
//         {
//           model: User,
//           as: "creator", // user_id
//           required: false,
//           attributes: ["id", "name", "email"],
//         },
//         {
//           model: User,
//           as: "client", // client_id
//           required: false,
//           attributes: ["id", "name", "email"],
//         },
//         {
//           model: Form,
//           required: false,
//           attributes: ["id", "name"],
//         },
//         {
//           model: CampaignLead,
//           required: false,
//           as: "leads",
//           attributes: ["data"],
//         },
//       ],
//       order: [["created_at", "DESC"]],
//     });

//     const formatted = campaigns.map((campaign) => {
//       const obj = campaign.toJSON();
//       return {
//         ...obj,
//         import_lead_fields:
//           typeof obj.import_lead_fields === "string"
//             ? JSON.parse(obj.import_lead_fields)
//             : obj.import_lead_fields || [],
//       };
//     });

//     res.json(formatted);
//   } catch (err) {
//     console.error("Error fetching campaigns:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// router.get("/:id", async (req, res) => {
//   try {
//     const campaign = await Campaign.findByPk(req.params.id, {
//       include: [
//         { model: User, as: "user" },
//         { model: User, as: "client" },
//         { model: Form },
//       ],
//     });

//     if (!campaign) return res.status(404).json({ error: "Campaign not found" });

//     const data = {
//       ...campaign.toJSON(),
//       import_lead_fields: campaign.import_lead_fields ? JSON.parse(campaign.import_lead_fields) : [],
//     };

//     res.json(data);
//   } catch (err) {
//     console.error("Error fetching campaign:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// router.put("/:id", csvUpload.single("file"), async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       name,
//       user_id,
//       client_id,
//       form_id,
//       import_lead_fields,
//       leadsDataParsed,
//     } = req.body;

//     console.log("Received body:", req.body);
//     console.log("Received file:", req.file);

//     // 1️⃣ Find campaign
//     const campaign = await Campaign.findByPk(id);
//     if (!campaign) {
//       return res.status(404).json({ error: "Campaign not found" });
//     }

//     // 2️⃣ Update campaign
//     await campaign.update({
//       name: name || campaign.name,
//       user_id: user_id || campaign.user_id,
//       client_id: client_id || campaign.client_id,
//       form_id: form_id || campaign.form_id,
//       import_lead_fields: import_lead_fields
//         ? JSON.parse(import_lead_fields)
//         : campaign.import_lead_fields,
//       file: req.file ? `/uploads/campaigns/${req.file.filename}` : campaign.file,
//     });

//     // 3️⃣ Add leads if provided
//     if (leadsDataParsed) {
//       const leads = typeof leadsDataParsed === "string"
//         ? JSON.parse(leadsDataParsed)
//         : leadsDataParsed;

//       if (Array.isArray(leads) && leads.length > 0) {
//         const entries = leads.map((lead) => ({
//           campaign_id: campaign.id,
//           data: lead,
//         }));

//         await CampaignLead.bulkCreate(entries);
//       }
//     }

//     res.status(200).json({ message: "Campaign updated successfully", campaign });
//   } catch (error) {
//     console.error("Error updating campaign:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// router.delete("/:id", async (req, res) => {
//   try {
//     const campaign = await Campaign.findByPk(req.params.id);
//     if (!campaign) return res.status(404).json({ error: "Campaign not found" });

//     await campaign.destroy();
//     res.json({ message: "Campaign deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting campaign:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
