'use strict';
const bcrypt =require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  const hashedPassword = await bcrypt.hash('Teksun',10);
    return queryInterface.bulkInsert('admin', [{
      vAdminType: 'SuperAdmin',
      vAdminName: 'Urvish Vaghela',
      vEmail: 'urvish@gmail.com',
      iDepartmentId:1,
      vPassword:hashedPassword,
      iCreatedAt: 1697189206,
      iUpdatedAt: 1697189511
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admin', null, {});
     
  }
};
