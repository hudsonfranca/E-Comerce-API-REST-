"use strict";

const faker = require("faker-br");
faker.setLocale("pt_BR");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "addresses",
      [
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 4,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 5,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 6,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 7,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 8,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 9,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 10,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 11,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 12,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 13,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 14,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 15,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 16,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 17,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 18,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 19,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          street_address: faker.address.streetName(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
          state: faker.address.state(),
          id_customers: 20,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("addresses", null, {});
  }
};
