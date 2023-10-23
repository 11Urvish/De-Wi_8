'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('device', {
        type: 'foreign key',
        fields: ['iDeviceTypeId'],
        references: {
          table: 'deviceType',
          field: 'iDeviceTypeId'
        }
    });await queryInterface.addConstraint('device', {
      type: 'foreign key',
      fields: ['iUserId'],
      references: {
        table: 'user',
        field: 'iUserId'
      }
  });
  },
  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.removeColumn('device', 'iDeviceTypeId')
    await queryInterface.removeColumn('device', 'iUserId')
  }
};
