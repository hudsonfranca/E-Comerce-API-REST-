const truncate = require('../utils/truncate');
const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');
const faker = require('faker');
const {Customers} = require('../../src/app/models');

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

        expect(response.status).toBe(200)

    })
    
    it('Should update a Customer',async()=>{

        const customer = await Customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hudson2@gmail.com",
            password:"123456",
            cpf:"12345678912",
            phone_number:"12345678910"
        })



        const response = await request(app)
        .put(`/api/customer/${customer.id}/edit`).send({
            first_name:"mike",
            last_name:"santos",
            email_address:"mike@gmail.com",
        })

        expect(response.status).toBe(200)

    })
    

})