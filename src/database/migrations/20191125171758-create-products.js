'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('products', { 
        id:{
          type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false,
           unique: true,
        },
        name:{
          type:Sequelize.STRING(50),
          allowNull:false,
        },
        brand_id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{model:'brands',key:'id'},
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        },
        categorie_id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{model:'categories',key:'id'},
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        },
        description:{
          type:Sequelize.STRING(2000) ,
          allowNull:false,
        },
       
        price:{
          type:Sequelize.DECIMAL(10,2),
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
   
      return queryInterface.dropTable('products');
    
  }
};
