'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('brands', [
        {
          name:"Apple",created_at: new Date(), updated_at:  new Date(),
        },
        {
          name:"Samsung",created_at: new Date(), updated_at:  new Date(),
        }, {
          name:"Microsoft",created_at: new Date(), updated_at:  new Date(),
        }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('brands', null, {});
    
  }
};

