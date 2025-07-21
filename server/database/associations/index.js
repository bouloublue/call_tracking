function init() {
  const { User, Campaign, CampaignMapping, Number } = global.db.models;

  // Campaign -> CampaignMapping (One-to-Many)
  Campaign.hasMany(CampaignMapping, {
    foreignKey: 'campaign_id',
    as: 'buyer_mappings',
    constraints: true,
  });

  CampaignMapping.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
    as: 'campaign',
    constraints: true,
  });

  // User (buyer) -> CampaignMapping (One-to-Many)
  User.hasMany(CampaignMapping, {
    foreignKey: 'buyer_id',
    as: 'campaign_mappings',
    constraints: true,
  });

  CampaignMapping.belongsTo(User, {
    foreignKey: 'buyer_id',
    as: 'buyer',
    constraints: true,
  });

  // Number association
  Campaign.belongsTo(Number, {
    foreignKey: 'number_id',
    as: 'number',
    constraints: true,
    onDelete: 'CASCADE',
  });

  Number.hasOne(Campaign, {
    foreignKey: 'number_id',
    as: 'campaign',
    constraints: true,
    onDelete: 'CASCADE',
  });
}

module.exports = init;