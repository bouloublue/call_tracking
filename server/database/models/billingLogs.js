const { DataTypes, Model } = require('sequelize');

class BillingLog extends Model {}

BillingLog.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  call_log_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'call_logs',
      key: 'id',
    },
  },

  rule_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'billing_rules',
      key: 'id',
    },
  },

  amount_charged: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    get() {
      return parseFloat(this.getDataValue('amount_charged'));
    },
  },

  duration_sec: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  override_rate: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: true,
    get() {
      const value = this.getDataValue('override_rate');
      return value !== null ? parseFloat(value) : null;
    },
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  sequelize: global.db.sequelizeConfig,
  modelName: 'billingLog',
  tableName: 'billing_logs',
  paranoid: true,
  deletedAt: 'deleted_at',
});

global.db.models.BillingLog = BillingLog;
module.exports = BillingLog;
