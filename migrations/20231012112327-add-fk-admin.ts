'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('admin', {
        type: 'foreign key',
        fields: ['iDepartmentId'],
        references: {
          table: 'department',
          field: 'iDepartmentId'
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('admin', 'iDepartmentId')
  }
};
