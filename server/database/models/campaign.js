const { sequelize } = require('../sequelizeDB');
const { DataTypes, Model } = require('sequelize');

class Campaign extends Model { }

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

  country: {
    type: DataTypes.STRING,
    allowNull: false
  },

  number_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references:{
      model: 'numbers',
      key: 'id',
    }
  },
  
  routing_method: {
    type: DataTypes.ENUM('manual', 'smart'),
    defaultValue: 'manual',
    allowNull: true,
  },

  isCallRecordingEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
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

