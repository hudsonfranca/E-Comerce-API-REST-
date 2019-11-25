const truncate = require('../utils/truncate');
const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');
const faker = require('faker');
const {Customer} = require('../../src/app/models');

describe('Customer Endpoints',()=>{

    beforeEach(async () => {
        await truncate();
       
      });

    it('Should create a new Customer.',async()=>{

        const response = await request(app)
        .post('/api/customer')
        .send({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hudson1@gmail.com",
            password:"123456",
            cpf:"12345678911",
            phone_number:"12345678910"
        })

       // console.log({testeRoutes:response.body})

        expect(response.status).toBe(201)

    })

    it('Should return all customers.',async()=>{

        const response = await request(app)
        .get('/api/customer')
        

       // console.log({testeRoutes:response.body})

        expect(response.status).toBe(200)

    })
    

})