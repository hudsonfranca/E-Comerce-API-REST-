const truncate = require('../utils/truncate');
const request = require('supertest');
const app = require('../../src/app');
const faker = require('faker');
const {customers} = require('../../src/app/models');
const {brands} = require('../../src/app/models');
const {categories} = require('../../src/app/models');
const {addresses} = require('../../src/app/models')
const factory = require("../factories");

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
            "status":true,
            "url_images":["c://imagem10","c://imagem11","c://imagem12"]
        })
         
      

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
            "status":true,
            "url_images":["c://imagem10","c://imagem11","c://imagem12"]
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
            "status":true,
            "url_images":["c://imagem10","c://imagem11","c://imagem12"]
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

    it('should display a list of products by categorie',async()=>{

        const brandCreated = await brands.create({
            name:'Apple'
        })

        const categoriesCreated = await categories.create({
            name:'Electronics'
        })

        await request(app).post(`/api/categorie/${categoriesCreated.id}/products`)
        .send({
            "name":"MacBook Pro",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos ",
            "price":8618.89,
            "status":true
            
        })

        const response = await request(app)
        .get(`/api/products?categorie_id=${categoriesCreated.id}`).send();

        
    

        expect(response.status).toBe(200)

    })

})

describe('Addresses Endpoints',()=>{
    it('Should create a new address',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"jooo@gmail.com",
            password:"123456",
            cpf:"12305978902",
            phone_number:"12345678910"
        })

        const response = await request(app)
        .post(`/api/customer/${createdCustomer.id}/addresses`).send({
            street_address:"Rua b",
            city:"Linhares",
            zip:"12345",
            country:"Brasil",
            state:"ES"
        });

        expect(response.status).toBe(201)


    })


    it('should display a list of addresses by customer.',async()=>{


        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"jooaa@gmail.com",
            password:"123456",
            cpf:"12305678902",
            phone_number:"12345678910"
        })

      const createdAddress = await addresses.create({
        street_address:"Rua b",
        city:"Linhares",
        zip:"12345",
        country:"Brasil",
        state:"ES",
        id_customers:createdCustomer.id
      })
      
        const response = await request(app)
        .get(`/api/customer/${createdCustomer.id}/addresses`).send();

        
    

        expect(response.status).toBe(200)

    })

    it('Should delete a address.',async()=>{

        
        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"joqo@gmail.com",
            password:"123456",
            cpf:"12305938902",
            phone_number:"12345678910"
        })

      const addressCreated = await addresses.create({
        street_address:"Rua b",
        city:"Linhares",
        zip:"12345",
        country:"Brasil",
        state:"ES",
        id_customers:createdCustomer.id
      })
      
        const response = await request(app)
        .delete(`/api/addresses/${addressCreated.id}`).send();

        console.log(response.error)
    

        expect(response.status).toBe(200)

    })

    it('Should update a address.',async()=>{

        
        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"j1@gmail.com",
            password:"123456",
            cpf:"12305930000",
            phone_number:"12345678910"
        })

      const addressCreated = await addresses.create({
        street_address:"Rua b",
        city:"Linhares",
        zip:"12345",
        country:"Brasil",
        state:"ES",
        id_customers:createdCustomer.id
      })
      
        const response = await request(app)
        .put(`/api/addresses/${addressCreated.id}/edit`).send({
            street_address:"Rua z",
            city:"Rio Bananal",
        });

        console.log(response.error)
    

        expect(response.status).toBe(200)

    })
})

describe('Brands Endpoints',()=>{
    it('Should create a new brand',async()=>{

    
        const response = await request(app)
        .post(`/api/brands`).send({
            name:"Samsung"
        });

        expect(response.status).toBe(201)


    })


    it('should display all brands',async()=>{

        const brandCreated = await brands.create({
            name:"Apple"
        });

        const response = await request(app)
        .get(`/api/brands`).send();

        expect(response.status).toBe(200)

    })

    it('Should delete a brand.',async()=>{

        const brandCreated = await brands.create({
            name:"Apple"
        });

        const response = await request(app)
        .delete(`/api/brands/${brandCreated.id}`).send();

        expect(response.status).toBe(200)

    })

    it('Should update a brand.',async()=>{

        
        const brandCreated = await brands.create({
            name:"Apple"
        });

        const response = await request(app)
        .put(`/api/brands/${brandCreated.id}/edit`).send({
            name:"Acer"
        });

        expect(response.status).toBe(200)
       

    })
})



describe('Categories Endpoints',()=>{
    it('Should create a new categorie',async()=>{

    
        const response = await request(app)
        .post(`/api/categories`).send({
            name:"Sapatos"
        });

        expect(response.status).toBe(201)


    })


    it('should display all categories',async()=>{

        const categorieCreated = await categories.create({
            name:"roupas"
        });

        const response = await request(app)
        .get(`/api/categories`).send();

        expect(response.status).toBe(200)

    })

    it('Should delete a categorie.',async()=>{

        const categorieCreated = await categories.create({
            name:"Apple"
        });

        const response = await request(app)
        .delete(`/api/categories/${categorieCreated.id}`).send();

        expect(response.status).toBe(200)

    })

    it('Should update a categorie.',async()=>{

        
        const categorieCreated = await categories.create({
            name:"Apple"
        });

        const response = await request(app)
        .put(`/api/categories/${categorieCreated.id}/edit`).send({
            name:"Acer"
        });

        expect(response.status).toBe(200)
       

    })
})

