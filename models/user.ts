'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Admin, {foreignKey: 'iAdminId'});
      User.belongsTo(models.Department, {foreignKey: 'iDepartmentId'});
      User.hasMany(models.UserLogin, { foreignKey: 'iUserId'});
      User.hasMany(models.AssignDevice, { foreignKey: 'iUserId'});
    }
  }
  User.init({

    iUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vUserName:{
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    iAdminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Admin",
        key: "iAdmin",
      },
    },
    iDepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Department",
        key: "iDepartmentId",
      },
    },
    vEmail: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    vPassword: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    vUserImage: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    iStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    iLastLoginAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      defaultValue: false,
      allowNull: false,
    },
  },{
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false,
});
  return User;
};