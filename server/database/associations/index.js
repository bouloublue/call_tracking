function init() {
  const {
    User,
    Campaign,
    CampaignMapping,
    Number,
    BillingRule,
    CallLog,
    BillingLog
  } = global.db.models;

  // Validate all models exist
  if (!User || !Campaign || !CampaignMapping || !Number || !BillingRule || !CallLog) {
    throw new Error('Required models are not initialized');
  }

  // 1. Campaign Associations
  Campaign.hasMany(CampaignMapping, {
    foreignKey: 'campaign_id',
    as: 'buyer_mappings',
    constraints: true,
    onDelete: 'CASCADE'
  });


  Campaign.belongsTo(Number, {
    foreignKey: 'number_id',
    as: 'number',
    constraints: true,
    onDelete: 'CASCADE'
  });

  Campaign.hasMany(BillingRule, {
    foreignKey: 'campaign_id',
    as: 'billing_rules',
    constraints: true,
    onDelete: 'CASCADE'
  });

  Campaign.hasMany(CallLog, {
    foreignKey: 'campaign_id',
    as: 'call_logs',
    constraints: true
  });

  // 2. User (Buyer) Associations
  // User.hasMany(CampaignMapping, {
  //   foreignKey: 'buyer_id',
  //   as: 'campaign_mappings',
  //   constraints: true
  // });

  // 3. CampaignMapping Associations

  CampaignMapping.belongsTo(User, {
    foreignKey: 'buyer_id',
    as: 'buyer',
    constraints: true
  });

  CampaignMapping.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
    as: 'campaign',
    constraints: true
  });

  User.hasMany(CallLog, {
    foreignKey: 'buyer_id',
    as: 'call_logs',
    constraints: true
  });


  // 4. Number Associations
  Number.hasOne(Campaign, {
    foreignKey: 'number_id',
    as: 'campaign',
    constraints: true,
    onDelete: 'CASCADE'
  });

  // 5. BillingRule Associations
  BillingRule.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
    as: 'campaign',
    constraints: true
  });

  BillingRule.hasMany(BillingLog, {
    foreignKey: 'rule_id',
    as: 'billing_logs',
    constraints: true
  });

  // 6. CallLog Associations
  CallLog.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
    as: 'campaign',
    constraints: true
  });

  CallLog.belongsTo(User, {
    foreignKey: 'buyer_id',
    as: 'buyer',
    constraints: true
  });

  // 7. BillingLog Associations
  BillingLog.belongsTo(BillingRule, {
    foreignKey: 'rule_id',
    as: 'billing_rule',
    constraints: true
  });

  BillingLog.belongsTo(CallLog, {
    foreignKey: 'call_log_id',
    as: 'call_log',
    constraints: true
  });

  // BillingLog.belongsTo(User, {
  //   foreignKey: 'buyer_id',
  //   as: 'buyer',
  // });

  // // user.js
  // User.hasMany(BillingLog, {
  //   foreignKey: 'buyer_id',
  //   as: 'billingLogs'
  // });

//   BillingLog.belongsTo(Campaign, {
//     foreignKey: 'campaign_id',
//     as: 'campaign'
//   });

//   Campaign.hasMany(BillingLog, {
//   foreignKey: 'campaign_id',
//   as: 'billingLogs'
// });
}


module.exports = init;