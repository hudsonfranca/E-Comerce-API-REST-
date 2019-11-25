'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('stock', { 
        id:{
          type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false,
           unique: true,
        },
        quantity:{
          type:Sequelize.INTEGER ,
          allowNull:false,
        },
        id_product:{
          type:Sequelize.INTEGER ,
          allowNull:false,
          references:{model:'products',key:'id'},
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        } ,
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
    
      return queryInterface.dropTable('stock');
    
  }
};
