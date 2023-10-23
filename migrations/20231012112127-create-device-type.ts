'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deviceType', {
      iDeviceTypeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vDeviceTypeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      iCreatdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      iUpdatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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
      modelName: "DeviceType",
      tableName: "deviceType",
      timestamps: false,
  });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('deviceType');
  }
};