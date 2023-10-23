'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('assignDevice', {
        type: 'foreign key',
        fields: ['iUserId'],
        references: {
          table: 'user',
          field: 'iUserId'
        }
    });
    await queryInterface.addConstraint('assignDevice', {
      type: 'foreign key',
      fields: ['iDeviceId'],
      references: {
        table: 'device',
        field: 'iDeviceId'
      }
  });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('assignDevice', 'iUserId')
    await queryInterface.removeColumn('assignDevice', 'iDeviceId')
  }
};
