"use strict";

const faker = require("faker-br");
faker.setLocale("pt_BR");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "customers",
      [
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email_address: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          cpf: faker.br.cpf(),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("customers", null, {});
  }
};
