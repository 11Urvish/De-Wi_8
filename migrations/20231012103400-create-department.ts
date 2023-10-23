'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('department', {
      iDepartmentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vDepartmentName: {
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
      modelName: "Department",
      tableName: "department",
      timestamps: false,
  });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('department');
  }
};