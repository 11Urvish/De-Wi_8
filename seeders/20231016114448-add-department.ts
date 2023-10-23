'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('department', [
    {
  
    vDepartmentName:"HOD",
    iCreatedAt: 1337183330,
    iUpdatedAt: 1337183331
  },{
  
    vDepartmentName:"IT",
    iCreatedAt: 1337183332,
    iUpdatedAt: 1337183333
  },{
  
    vDepartmentName:"CE",
    iCreatedAt: 1337183334,
    iUpdatedAt: 1337183335
  },{
    vDepartmentName:"BM",
    iCreatedAt: 1337183333,
    iUpdatedAt: 1337183337
  },{
  
    vDepartmentName:"ME",
    iCreatedAt: 1337183338,
    iUpdatedAt: 1337183333
  },{
  
    vDepartmentName:"EC",
    iCreatedAt: 1337131031,
    iUpdatedAt: 1337131032
  }
]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('department', null, {});
  }
};
