const faker = require('faker');
const {factory} = require('factory-girl');
const Customer = require('../src/app/models/Customer');

factory.define('Customer',Customer,{
    
    first_name:faker.name.firstName(),
    last_name:faker.name.lastName(),
    email_address:faker.internet.email(),
    password:faker.internet.password(),
    cpf:"12345678910",
    phone_number:faker.phone.phoneNumber()

})


module.exports = factory;