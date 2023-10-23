'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.belongsTo(models.DeviceType, {foreignKey: 'iDeviceTypeId'});
      Device.belongsTo(models.User, {foreignKey: 'iUserId'});
      Device.hasMany(models.AssignDevice, { foreignKey: 'iDeviceId'});
    }
  }
  Device.init({
    iDeviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    iDeviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "DeviceType",
        key: "iDeviceTypeId",
      }},
    vDeviceName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    iUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "iUserId",
      }
    },
    vLabel: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    vModel: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    vDeviceImage: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    iStatus: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    iCreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
     
    },
    iUpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
     },
    iCreatedAt: {
      
      type: DataTypes.INTEGER,allowNull: false,
    },
    iUpdatedAt: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    iDeletedAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bIsDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },{
    sequelize,
    modelName: "Device",
    tableName: "device",
    timestamps: false,
});
  return Device;
};