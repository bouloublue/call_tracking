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


router.put("/:id", async (req, res) => {
  const campaignId = req.params.id;
  const {
    name,
    country,
    number_id,
    routing_method,
    isCallRecordingEnabled,
    is_active,
    buyers,
  } = req.body;

  const CampaignMapping = global.db.models.CampaignMapping;
  const User = global.db.models.User;

  const transaction = await global.db.sequelizeConfig.transaction();

  try {
    const campaign = await Campaign.findByPk(campaignId, { transaction });
    if (!campaign) {
      await transaction.rollback();
      return res.status(404).json({ error: "Campaign not found" });
    }

    await campaign.update({
      name,
      country,
      number_id,
      routing_method,
      isCallRecordingEnabled,
      is_active,
    }, { transaction });

    if (buyers && Array.isArray(buyers) && buyers.length > 0) {

      const buyerRecords = await User.findAll({
        where: {
          name: buyers,
          role: 'buyer',
        },
        transaction,
      });

      const buyerIds = buyerRecords.map(b => b.id);

    
      // Delete existing mappings for this campaign
      await CampaignMapping.destroy({
        where: { campaign_id: campaignId },
        transaction,
      });

      const newMappings = buyerIds.map(buyer_id => ({
        campaign_id: campaignId,
        buyer_id,
      }));

      await CampaignMapping.bulkCreate(newMappings, { transaction });
    }

    await transaction.commit();

    res.json({ message: "Campaign updated successfully", campaign });
  } catch (error) {
    console.error("Error updating campaign:", error);
    await transaction.rollback();
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.put("/:id", async (req, res) => {
//   const campaignId = req.params.id;
//   const {
//     name,
//     country,
//     number_id,
//     routing_method,
//     isCallRecordingEnabled,
//     is_active,
//     buyers,
//   } = req.body;

//   const CampaignMapping = global.db.models.CampaignMapping;
//   const User = global.db.models.User;

//   const transaction = await global.db.sequelizeConfig.transaction();

//   try {
//     const campaign = await Campaign.findByPk(campaignId, { 
//       transaction,
//       include: [{
//         model: CampaignMapping,
//         as: 'campaign_mappings',
//         include: [{ model: User, as: 'User', attributes: ['id', 'name'] }],
//       }]
//     });

//     if (!campaign) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "Campaign not found" });
//     }

//     // Update basic campaign info
//     await campaign.update({
//       name,
//       country,
//       number_id,
//       routing_method,
//       isCallRecordingEnabled,
//       is_active,
//     }, { transaction });

//     // Only process buyers if the field is explicitly provided in the request
//     if (req.body.hasOwnProperty('buyers')) {
//       if (!Array.isArray(buyers)) {
//         await transaction.rollback();
//         return res.status(400).json({ error: "Buyers should be an array" });
//       }

//       // Get current buyer names
//       const currentBuyers = campaign.CampaignMappings
//         .map(mapping => mapping.User.name)
//         .sort();

//       // Sort and compare with new buyers
//       const newBuyers = [...buyers].sort();

//       // Only update if buyers actually changed
//       if (JSON.stringify(currentBuyers) !== JSON.stringify(newBuyers)) {
//         const buyerRecords = await User.findAll({
//           where: {
//             name: buyers,
//             role: 'buyer',
//           },
//           transaction,
//         });

//         const buyerIds = buyerRecords.map(b => b.id);

//         if (buyers.length > 0 && buyerIds.length === 0) {
//           await transaction.rollback();
//           return res.status(404).json({ error: "No buyers found with the provided names" });
//         }

//         // Delete existing mappings for this campaign
//         await CampaignMapping.destroy({
//           where: { campaign_id: campaignId },
//           transaction,
//         });

//         // Only create new mappings if we have buyers
//         if (buyerIds.length > 0) {
//           const newMappings = buyerIds.map(buyer_id => ({
//             campaign_id: campaignId,
//             buyer_id,
//           }));

//           await CampaignMapping.bulkCreate(newMappings, { transaction });
//         }
//       }
//       // If buyers didn't change, do nothing
//     }

//     await transaction.commit();

//     res.json({ message: "Campaign updated successfully", campaign });
//   } catch (error) {
//     console.error("Error updating campaign:", error);
//     await transaction.rollback();
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      include: [
        {
          model: global.db.models.CampaignMapping,
          as: 'buyer_mappings',
          include: [
            {
              model: global.db.models.User,
              as: 'buyer',
              attributes: ['id', 'name', 'email'], 
              where: {
                role: 'buyer',
              },
            },
          ],
        },
        {
          model: global.db.models.Number,
          as: 'number',
          attributes: ['id', 'number'], 
        }
      ],
    });
    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id, {
      include: [
        {
          model: global.db.models.CampaignMapping,
          as: 'buyer_mappings',
          include: [
            {
              model: global.db.models.User,
              as: 'buyer',
              attributes: ['id', 'name', 'email'],
              where: {
                role: 'buyer',
              },
            },
          ],
        },
        {
          model: global.db.models.Number,
          as: 'number',
          attributes: ['id', 'number'],
        }
      ],
    });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.json(campaign);
  } catch (error) {
    console.error("Error fetching campaign:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const campaignId = req.params.id;

  const t = await global.db.sequelizeConfig.transaction();
  try {
    const campaign = await Campaign.findByPk(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    // Remove all related mappings
    const CampaignMapping = global.db.models.CampaignMapping;
    await CampaignMapping.destroy({ where: { campaign_id: campaignId }, transaction: t });

    // Delete the campaign
    await campaign.destroy({ transaction: t });

    await t.commit();
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    await t.rollback();
    console.error("Error deleting campaign:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
