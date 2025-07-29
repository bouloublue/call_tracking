const { DataTypes, Model } = require('sequelize');

class OtPVerification extends Model {}

OtPVerification.init({
   phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
}, {
  sequelize: global.db.sequelizeConfig,
  modelName: 'OtpVerification',
  tableName: 'otp_verifications',
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

global.db.models.OtpVerification = OtPVerification;
module.exports = OtPVerification;
