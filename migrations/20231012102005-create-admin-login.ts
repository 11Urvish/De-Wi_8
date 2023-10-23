'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adminLogin', {
      iAdminLoginId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iAdminId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vAdminToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      iCreatedAt: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      iUpdatedAt: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
    }, {
      Sequelize,
      modelName: "AdminLogin",
      tableName: "adminLogin",
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('adminLogin');
  }
};