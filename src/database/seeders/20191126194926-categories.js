'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('categories', [
        {
        name:"Eletronicos",created_at: new Date(), updated_at:  new Date(),
      },
      {
        name:"Eletrodomesticos",created_at: new Date(), updated_at:  new Date(),
      }, {
        name:"Casa mesa e banho",created_at: new Date(), updated_at:  new Date(),
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('categories', null, {});
    
  }
};

//yarn sequelize db:seed:all
//yarn sequelize seed:generate --name brands
//yarn sequelize db:seed:undo:all