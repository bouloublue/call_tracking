const { sequelize } = require('../sequelizeDB');
const { DataTypes, Model } = require('sequelize');

class Form extends Model {}

Form.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    fields: {
      type: DataTypes.TEXT, // Store JSON as string
      allowNull: false,
      get() {
        const raw = this.getDataValue("fields");
        return raw ? JSON.parse(raw) : [];
      },
      set(value) {
        this.setDataValue("fields", JSON.stringify(value));
      },
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
  modelName: 'form',
  tableName: 'forms',
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
});

global.db.models.Form = Form;
module.exports = Form;
