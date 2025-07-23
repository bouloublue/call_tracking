const { DataTypes, Model } = require('sequelize');

class CallLog extends Model {}

CallLog.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  call_sid: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },

  campaign_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'campaigns',
      key: 'id',
    },
  },

  buyer_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },

  caller_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  duration_sec: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING(20),
    allowNull: true, // e.g., 'completed', 'no-answer'
  },

  recording_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  is_converted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  recording_duration:{
    type: DataTypes.INTEGER,
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
  modelName: 'callLog',
  tableName: 'call_logs',
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

global.db.models.CallLog = CallLog;
module.exports = CallLog;
