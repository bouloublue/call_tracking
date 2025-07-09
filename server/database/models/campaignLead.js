const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelizeDB');

class CampaignLead extends Model { }

CampaignLead.init(
  {
    campaign_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  },{
    sequelize: global.db.sequelizeConfig,
    modelName: 'campaign_lead',
    tableName: 'campaign_leads',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    paranoid: true,
    deletedAt: 'deleted_at',
    sequelize: global.db.sequelizeConfig,
    timestamps: false,
    defaultScope: {
      where: {
        deleted_at: null,
      },
      order: [['created_at', 'desc']],
    },
    scopes: {
      withDeleted: {
        where: {},
      },
    },
    hooks: {},
  }
);

global.db.models.CampaignLead = CampaignLead;
module.exports = CampaignLead;
