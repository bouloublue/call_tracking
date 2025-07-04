function init() {
  const { User, Campaign, Form } = global.db.models;

  // A User (creator) has many Campaigns (user_id)
  User.hasMany(Campaign, {
    foreignKey: 'user_id',
    as: 'createdCampaigns',
    constraints: false,
  });
  Campaign.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'creator',
    constraints: false,
  });

  // A User (client) has many Campaigns (client_id)
  User.hasMany(Campaign, {
    foreignKey: 'client_id',
    as: 'clientCampaigns',
    constraints: false,
  });
  Campaign.belongsTo(User, {
    foreignKey: 'client_id',
    as: 'client',
    constraints: false,
  });

  // A Form has many Campaigns
  Form.hasMany(Campaign, {
    foreignKey: 'form_id',
    constraints: false,
  });
  Campaign.belongsTo(Form, {
    foreignKey: 'form_id',
    constraints: false,
  });
}

module.exports = init;
