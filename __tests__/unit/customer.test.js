const truncate = require('../utils/truncate');
const factory = require('../factories');
const bcrypt = require("bcrypt");
const {Customers} = require('../../src/app/models');

describe('Customer',()=>{

    beforeEach(async()=>{
        await truncate();
    })

   
   
    it('Should encript user password',async()=>{
        const customer = await Customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hudson@gmail.com",
            password:"123456",
            cpf:"12345678910",
            phone_number:"12345678910"
        })

        // console.log({testeEncript:customer.dataValues})
 
        const compareHash = await bcrypt.compare('123456',customer.password);
 
        expect(compareHash).toBe(true);
     })
})

//database.sqlite

