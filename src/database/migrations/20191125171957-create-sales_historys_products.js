'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('Sales_History_Products', { 
        id:{
          type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false,
           unique: true,
        },
        id_sales_history:{
          type:Sequelize.INTEGER,
           allowNull:false,
           references:{model:'Sales_Historys',key:'id'},
           onUpdate:'CASCADE',
           onDelete:'CASCADE'
        },
        id_products:{
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
    
      return queryInterface.dropTable('Sales_History_Products');
    
  }
};
