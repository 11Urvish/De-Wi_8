'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Department.hasMany(models.Admin, { foreignKey: 'iDepartmentId'});
      Department.hasMany(models.User, { foreignKey: 'iDepartmentId'});
    }
  }
  Department.init({
    iDepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vDepartmentName: {
      type: DataTypes.STRING(50),
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
    modelName: "Department",
    tableName: "department",
    timestamps: false,
});
  return Department;
};