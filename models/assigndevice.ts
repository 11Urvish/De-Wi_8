'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class AssignDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AssignDevice.belongsTo(models.User, {foreignKey: 'iUserId'});
      AssignDevice.belongsTo(models.Device, {foreignKey: 'iDeviceId'});
    }
  }
  AssignDevice.init({
   
    iAssignDeviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    iDeviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Device",
        key: "iDeviceId",
      }},
      iUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "iUserId",
        }
      },
      iAssignBy: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      iCreatedAt: {
        allowNull: false,
        type: DataTypes.INTEGER
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
        allowNull: true,
      },
  }, {
    sequelize,
    modelName: 'AssignDevice',
    tableName: "assignDevice",
    timestamps: false,
  });
  return AssignDevice;
};