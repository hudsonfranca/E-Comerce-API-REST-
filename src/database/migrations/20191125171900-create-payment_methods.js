'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('Payment_Methods', {
        id:{
          type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false,
           unique: true,
        },
        name:{
          type:Sequelize.STRING(20),
          allowNull:false,
        },
        status:{
          type:Sequelize.BOOLEAN,
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
    
      return queryInterface.dropTable('Payment_Methods');
    
  }
};
