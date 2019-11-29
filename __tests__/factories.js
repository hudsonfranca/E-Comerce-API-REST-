const faker = require("faker");
const { factory } = require("factory-girl");
const {customers} = require('../src/app/models');
const {addresses} = require('../src/app/models');

const  emailAddress = faker.internet.email();

factory.define("customers",customers,{
    first_name:faker.name.firstName(),
    last_name:faker.name.lastName(),
    email_address:emailAddress.toLowerCase(),
    password:faker.internet.password(),
    cpf:"12345678915",
    phone_number:"12345678910"
})

factory.define("addresses",addresses,{
    street_address:faker.address.streetAddress(),
    city:faker.address.city(),
    zip:faker.address.zipCode(),
    country:faker.address.country(),
    state:faker.address.state()
})

module.exports = factory;

