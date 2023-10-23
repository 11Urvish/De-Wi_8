'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('device', {
      iDeviceId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iDeviceTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      iUserId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      vDeviceName: {
        type: Sequelize.STRING,
        allowNull: false      
      },
      vLabel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vModel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vDeviceImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      iStatus: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      iCreatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      iUpdatedBy: {
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
      modelName: "Device",
      tableName: "device",
      timestamps: false,
  });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('device');
  }
};