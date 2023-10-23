'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assignDevice', {
      iAssignDeviceId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iDeviceId: {
        type: Sequelize.INTEGER
      },
      iUserId: {
        type: Sequelize.INTEGER
      },
      iAssignBy: {
        type: Sequelize.INTEGER,
        allowNull: true
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
      bIsDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    }, {
      Sequelize,
      modelName: "AssignDevice",
      tableName: "assignDevice",
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('assignDevice');
  }
};
