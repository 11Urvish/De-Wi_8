'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('user', {
        type: 'foreign key',
        fields: ['iAdminId'],
        references: {
          table: 'admin',
          field: 'iAdminId'
        }
    });
    await queryInterface.addConstraint('user', {
      type: 'foreign key',
      fields: ['iDepartmentId'],
      references: {
        table: 'department',
        field: 'iDepartmentId'
      }
  });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user', 'iDepartmentId')
    await queryInterface.removeColumn('user', 'iAdminId')
  }
};
