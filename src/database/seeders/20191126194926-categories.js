"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Phones",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Computer",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Home",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  }
};

//yarn sequelize db:seed:all
//yarn sequelize seed:generate --name brands
//yarn sequelize db:seed:undo:all
