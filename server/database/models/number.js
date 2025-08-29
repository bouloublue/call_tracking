const { DataTypes, Model } = require('sequelize');

class Number extends Model {}

Number.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  friendly_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  type: {
    type: DataTypes.ENUM('local', 'toll'),
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
  },

  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize: global.db.sequelizeConfig,
  modelName: 'number',
  tableName: 'numbers',
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

global.db.models.Number = Number;
module.exports = Number;
