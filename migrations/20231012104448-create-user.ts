'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      iUserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vUserName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      iAdminId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      iDepartmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vPassword: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vUserImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      iStatus: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
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
      bIsDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      iDeletedAt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },{
      Sequelize,
      modelName: "User",
      tableName: "user",
      timestamps: false,
  });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};