'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class DeviceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DeviceType.hasMany(models.Device, { foreignKey: 'iDeviceTypeId'})
    }
  }
  DeviceType.init({
    iDeviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vDeviceTypeName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    iCreatedAt: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    iCreatdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    iUpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
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
    modelName: "DeviceType",
    tableName: "deviceType",
    timestamps: false,
});
  return DeviceType;
};