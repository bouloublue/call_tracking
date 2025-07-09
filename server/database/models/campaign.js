const { sequelize } = require('../sequelizeDB');
const { DataTypes, Model } = require('sequelize');

class Campaign extends Model {}

Campaign.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'Created by (Admin/Staff)',
  },

  client_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'Client who owns the campaign',
  },

  form_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'Linked form',
  },

  import_lead_fields: {
    type: DataTypes.JSON, // parsed JSON
    allowNull: true,
  },

  file: {
    type: DataTypes.STRING, // file path or URL
    allowNull: true,
  },

  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at',
  sequelize: global.db.sequelizeConfig,
  modelName: 'campaign',
  tableName: 'campaigns',
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
});

global.db.models.Campaign = Campaign;
module.exports = Campaign;

