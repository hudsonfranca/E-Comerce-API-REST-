'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('cart_products', { 
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
           references:{model:'carts',key:'id'},
           onUpdate:'CASCADE',
           onDelete:'CASCADE'
        },
        id_product:{
          type:Sequelize.INTEGER,
           allowNull:false,
           references:{model:'products',key:'id'},
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
   
      return queryInterface.dropTable('cart_products');
    
  }
};
