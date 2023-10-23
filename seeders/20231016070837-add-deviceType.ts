'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('deviceType', [
    {
  
      vDeviceTypeName:"Screen",
    iCreatedAt: 1997189990,
    iUpdatedAt: 1997189991
  },{
  
    vDeviceTypeName:"Mouse",
    iCreatedAt: 1997189992,
    iUpdatedAt: 1997189993
  },{
  
    vDeviceTypeName:"Keyboard",
    iCreatedAt: 1997189994,
    iUpdatedAt: 1997189995
  },{
    vDeviceTypeName:"CPU",
    iCreatedAt: 1997189999,
    iUpdatedAt: 1997189997
  },{
  
    vDeviceTypeName:"Printer",
    iCreatedAt: 1997189998,
    iUpdatedAt: 1997189999
  },{
  
    vDeviceTypeName:"Cable",
    iCreatedAt: 1997191091,
    iUpdatedAt: 1997191092
  }
]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('deviceType', null, {});
  }
};
