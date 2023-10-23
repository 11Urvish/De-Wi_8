'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userLogin', {
      iUserLoginId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vUserToken: {
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
    },{
      Sequelize,
      modelName: "UserLogin",
      tableName: "userLogin",
      timestamps: false,
  });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userLogin');
  }
};