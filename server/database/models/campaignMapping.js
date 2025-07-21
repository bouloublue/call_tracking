const { DataTypes, Model } = require('sequelize');

class CampaignMapping extends Model {}

CampaignMapping.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  campaign_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'campaigns',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },

  buyer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize: global.db.sequelizeConfig,
  modelName: 'campaign_mapping',
  tableName: 'campaign_mappings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at',
  defaultScope: {
    where: {
      deleted_at: null,
    },
  },
  scopes: {
    withDeleted: {
      where: {},
    },
  },
});

global.db.models.CampaignMapping = CampaignMapping;
module.exports = CampaignMapping;
