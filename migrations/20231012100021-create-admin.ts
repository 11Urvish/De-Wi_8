'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin', {
      iAdminid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vAdminType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vAdminName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      iDepartmentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      vEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vPassword: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vResetToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vAdminImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      iStatus: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: 1
      },
      bIsDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      iCreatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      iUpdatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      iLastLoginAt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      iCreatedAt: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      iUpdatedAt: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      iDeletedAt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },{
      Sequelize,
      modelName: "Admin",
      tableName: "admin",
      timestamps: false,
  });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admin');
  }
};