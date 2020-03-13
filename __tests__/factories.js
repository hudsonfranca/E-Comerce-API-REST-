const faker = require("faker");
const { factory } = require("factory-girl");
const { customers, addresses, users } = require("../src/app/models");

const emailAddress = faker.internet.email();

factory.define("users", users, {
  first_name: "Hudson",
  last_name: "Silvares França ",
  email_address: "hudsonsilvares@gmail.com",
  password: "12345678",
  phone_number: "89816543301",
  cpf: "01345001022"
});

factory.define("addresses", addresses, {
  street_address: faker.address.streetAddress(),
  city: faker.address.city(),
  zip: faker.address.zipCode(),
  country: faker.address.country(),
  state: faker.address.state()
});

module.exports = factory;
