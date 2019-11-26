'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.createTable('Categories', { 
        id:{
          type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false,
           unique: true,
        },
        name:{
          type:Sequelize.STRING(100),
            allowNull:false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
         
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          
        },
       });
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('Categories');
    
  }
};
