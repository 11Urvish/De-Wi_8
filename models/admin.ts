"use strict";
// const { Model } = require("sequelize");
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.hasMany(models.AdminLogin, { foreignKey: 'iAdminId'});
      Admin.hasMany(models.User, { foreignKey: 'iAdminId'});
      Admin.belongsTo(models.Department, {foreignKey: 'iDepartmentId'});
    }
  }
  Admin.init(
    {
      iAdminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vAdminType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vAdminName: {
        type: DataTypes.STRING(50),
        allowNull: true,
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
      vResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vAdminImage: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      bIsDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
      
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "admin",
      timestamps: false,
  }
  );
  return Admin;
};
