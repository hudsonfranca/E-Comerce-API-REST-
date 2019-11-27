const truncate = require('../utils/truncate');
const request = require('supertest');
const app = require('../../src/app');
const {customers} = require('../../src/app/models');
const {brands} = require('../../src/app/models');
const {categories} = require('../../src/app/models');
const {products} = require('../../src/app/models')

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

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hudson2@gmail.com",
            password:"123456",
            cpf:"12345678912",
            phone_number:"12345678910"
        })



        const response = await request(app)
        .put(`/api/customer/${createdCustomer.id}/edit`).send({
            first_name:"mike",
            last_name:"santos",
            email_address:"mike@gmail.com",
        })

        expect(response.status).toBe(200)

    })
    

})

describe('Products Endpoints',()=>{

    
    beforeEach(async () => {
        await truncate();
       
      });

    it('Should create a new Product',async()=>{

        const brandCreated = await brands.create({
            name:'Apple'
        })

        const categoriesCreated = await categories.create({
            name:'Electronics'
        })

        const response = await request(app)
        .post(`/api/categorie/${categoriesCreated.id}/products`)
        .send({
            "name":"MacBook Pro",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos ",
            "price":8618.89,
            "status":true
        })
         
       console.log(response.text)

        expect(response.status).toBe(201)

    })

    it('Should delete a Product',async()=>{

        const brandCreated = await brands.create({
            name:'Apple'
        })

        const categoriesCreated = await categories.create({
            name:'Electronics'
        })

        const productCreated = await request(app)
        .post(`/api/categorie/${categoriesCreated.id}/products`)
        .send({
            "name":"MacBook Pro",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos ",
            "price":8618.89,
            "status":true
        })

        const response = await request(app)
        .delete(`/api/products/${productCreated.body.id}`).send();
    

        expect(response.status).toBe(200)

    })

    it('Should update a Product',async()=>{

        const brandCreated = await brands.create({
            name:'Apple'
        })

        const categoriesCreated = await categories.create({
            name:'Electronics'
        })

        const productCreated = await request(app)
        .post(`/api/categorie/${categoriesCreated.id}/products`)
        .send({
            "name":"MacBook Pro",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos ",
            "price":8618.89,
            "status":true
        })

        const response = await request(app)
        .put(`/api/products/${productCreated.body.id}/edit`).send({
            
                "name":"MacBook Air",
                "brand_id":brandCreated.id,
                "description":"Processador - mais poder em seus núcleos ",
                "price":5000.00,
                "status":false
            
        });
    

        expect(response.status).toBe(200)

    })




})