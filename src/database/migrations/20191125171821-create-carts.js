'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('Carts', { 
        id:{
          type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false,
           unique: true,
        },
          id_customers:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{model:'Customers',key:'id'},
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
    
      return queryInterface.dropTable('Carts');
    
  }
};
