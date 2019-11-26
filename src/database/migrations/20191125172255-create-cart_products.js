'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('Cart_Products', { 
        id:{
          type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false,
           unique: true,
        },
        id_cart:{
          type:Sequelize.INTEGER,
           allowNull:false,
           references:{model:'Carts',key:'id'},
           onUpdate:'CASCADE',
           onDelete:'CASCADE'
        },
        id_product:{
          type:Sequelize.INTEGER,
           allowNull:false,
           references:{model:'Products',key:'id'},
           onUpdate:'CASCADE',
           onDelete:'CASCADE'
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
   
      return queryInterface.dropTable('Cart_Products');
    
  }
};
