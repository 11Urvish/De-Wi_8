'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('userLogin', {
        type: 'foreign key',
        fields: ['iUserId'],
        references: {
          table: 'user',
          field: 'iUserId'
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userLogin', 'iUserId')
  }
};
