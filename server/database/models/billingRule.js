const { DataTypes, Model } = require('sequelize');

class BillingRule extends Model {}

BillingRule.init({
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
  },

  min_duration_sec: {
    type: DataTypes.INTEGER,
    defaultValue: 90,
  },

 rate_per_min: {
  type: DataTypes.DECIMAL(10, 4),
  defaultValue: 0.06,
  get() {
    return parseFloat(this.getDataValue('rate_per_min'));
  }
},

  allow_override: {
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
  modelName: 'billingRule',
  tableName: 'billingrules',
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

global.db.models.BillingRule = BillingRule;
module.exports = BillingRule;
