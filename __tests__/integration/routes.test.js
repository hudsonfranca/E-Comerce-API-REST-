const truncate = require('../utils/truncate');
const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');
const {customers} = require('../../src/app/models');
const {brands} = require('../../src/app/models');
const {categories} = require('../../src/app/models');
const {addresses} = require('../../src/app/models');
const {products} = require('../../src/app/models');
const {stock} = require('../../src/app/models');
const {carts} = require('../../src/app/models')
const {payment_methods} = require('../../src/app/models')
const {sales_historys} = require('../../src/app/models')



//test.only

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

    it('Should not create a new customer if the email is already registered.',async()=>{

        await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hudson1@gmail.com",
            password:"123456",
            cpf:"12345678911",
            phone_number:"12345678910"
        })

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

        expect(response.status).toBe(400)

    })

    it('Should not create a new customer if the cpf is already registered.',async()=>{

        await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hudso@gmail.com",
            password:"123456",
            cpf:"12345678911",
            phone_number:"12345678910"
        })

        const response = await request(app)
        .post('/api/customer')
        .send({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hud@gmail.com",
            password:"123456",
            cpf:"12345678911",
            phone_number:"12345678910"
        })

       // console.log({testeRoutes:response.body})

        expect(response.status).toBe(400)

    })

    it('should not create a new customer with invalid data',async()=>{


        const response = await request(app)
        .post('/api/customer')
        .send({
            first_name:"Hudson",
            last_name:"França",
            email_address:"HUDS@gmail.com",
            password:"123456",
            cpf:"123456789111111",
            phone_number:"12345678910"
        })

       // console.log({testeRoutes:response.body})

        expect(response.status).toBe(400)

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
            email_address:"hudso02@gmail.com",
            password:"123456",
            cpf:"12345608912",
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

    it('Should not update a customer that does not exist',async()=>{


        const response = await request(app)
        .put(`/api/customer/${null}/edit`).send()

        expect(response.status).toBe(400)

    })

    it('should not update a customer with invalid data',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hudso0002@gmail.com",
            password:"123456",
            cpf:"12300008912",
            phone_number:"12345678910"
        })



        const response = await request(app)
        .put(`/api/customer/${createdCustomer.id}/edit`).send({
            first_name:null,
            last_name:"",
            email_address:"mikegmail.com",
        })

        expect(response.status).toBe(400)

    })

    it('should delete a customer',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hudso0002@gmail.com",
            password:"123456",
            cpf:"12300008912",
            phone_number:"12345678910"
        })



        const response = await request(app)
        .delete(`/api/customer/${createdCustomer.id}`).send()

        expect(response.status).toBe(200)

    })

    it('should not delete a customer that does not exist',async()=>{

        const response = await request(app)
        .delete(`/api/customer/${null}`).send()

        expect(response.status).toBe(400)

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

    it('should not create a new product with an invalid brand',async()=>{


        const categoriesCreated = await categories.create({
            name:'Electronics'
        })

        const response = await request(app)
        .post(`/api/categorie/${categoriesCreated.id}/products`)
        .send({
            "name":"MacBook Pro",
            "brand_id":null,
            "description":"Processador - mais poder em seus núcleos ",
            "price":8618.89,
            "status":true,
            "url_images":["c://imagem10","c://imagem11","c://imagem12"]
        })
         
      

        expect(response.status).toBe(400)

    })

    it('should not create a new product with an invalid categorie',async()=>{


        const brandCreated = await brands.create({
            name:'Apple'
        })

        const response = await request(app)
        .post(`/api/categorie/${null}/products`)
        .send()
         
      

        expect(response.status).toBe(400)

    })


    it('Should delete a Product',async()=>{

        const brandCreated = await brands.create({
            name:'Apple'
        })

        const productCreated = await products.create({
            "name":"MacBook Pro",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos ",
            "price":8618.89,
            "status":true,
        })

        const response = await request(app)
        .delete(`/api/products/${productCreated.id}`).send();
    

        expect(response.status).toBe(200)

    })

    it('Should not delete a product that does not exist',async()=>{

        const response = await request(app)
        .delete(`/api/products/${null}`).send();
    

        expect(response.status).toBe(400)

    })

    it('Should update a Product',async()=>{

        const brandCreated = await brands.create({
            name:'Apple'
        })

       const productCreated = await products.create(
        {
            "name":"MacBook Pro",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos ",
            "price":8618.89,
            "status":true
        }
       )

        const response = await request(app)
        .put(`/api/products/${productCreated.id}/edit`).send({
            
                "name":"MacBook Air",
                "brand_id":brandCreated.id,
                "description":"Processador - mais poder em seus núcleos ",
                "price":5000.00,
                "status":false
            
        });
    

        expect(response.status).toBe(200)

    })

    it('Should not update a product that does not exist',async()=>{

        const response = await request(app)
        .put(`/api/products/${null}/edit`).send();
    

        expect(response.status).toBe(400)

    })

    it('should not update a product with invalid data',async()=>{

        const brandCreated = await brands.create({
            name:'Apple'
        })

        const categoriesCreated = await categories.create({
            name:'Electronics'
        })

        const productCreated = await products.create({
            "name":"MacBook Pro",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos ",
            "price":8618.89,
            "status":true,
        })

        const response = await request(app)
        .put(`/api/products/${productCreated.id}/edit`).send({
            
                "name":null,
                "brand_id":brandCreated.id,
                "description":"Processador - mais poder em seus núcleos ",
                "price":5000.00,
                "status":false
            
        });
    

        expect(response.status).toBe(400)

    })


    it('should return a list of products by categorie',async()=>{

        const response = await request(app).get(`/api/products`)
        .send()

        expect(response.status).toBe(200)

    })

})





describe('Addresses Endpoints',()=>{

    beforeEach(async () => {
        await truncate();
       
      });

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

    it('should not create an address without a valid customer',async()=>{

        const response = await request(app)
        .post(`/api/customer/${null}/addresses`).send();

        expect(response.status).toBe(400)


    })

    it('Should not create an address with invalid data',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"j@gmail.com",
            password:"123456",
            cpf:"12300078902",
            phone_number:"12345678910"
        })

        const response = await request(app)
        .post(`/api/customer/${createdCustomer.id}/addresses`).send({
            street_address:null,
            city:null,
            zip:"12345",
            country:"Brasil",
            state:"ES"
        });

        expect(response.status).toBe(400)


    })


    it('should return a list of addresses by customer.',async()=>{


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

    it('Should not return an address list without a valid customer',async()=>{

        const response = await request(app)
        .get(`/api/customer/${null}/addresses`).send();

        expect(response.status).toBe(400)


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

        
    

        expect(response.status).toBe(200)

    })

    it('Should not delete an address that does not exist.',async()=>{

      
        const response = await request(app)
        .delete(`/api/addresses/${null}`).send();
    

        expect(response.status).toBe(400)

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

       
    

        expect(response.status).toBe(200)

    })

    it('Should not update an address with invalid data.',async()=>{

        
        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"j11@gmail.com",
            password:"123456",
            cpf:"12305911000",
            phone_number:"12345678910"
        })

      const addressCreated = await addresses.create({
        street_address:"rua",
        city:"Linhres",
        zip:"12345",
        country:"Brasil",
        state:"ES",
        id_customers:createdCustomer.id
      })
      
        const response = await request(app)
        .put(`/api/addresses/${addressCreated.id}/edit`).send({
            street_address:null,
            city:"",
        });
    

        expect(response.status).toBe(400)

    })

    it('should not update an address that does not exist',async()=>{

      
        const response = await request(app)
        .put(`/api/addresses/${null}/edit`).send();

        console.log(response.error)
    

        expect(response.status).toBe(400)

    })
})

describe('Brands Endpoints',()=>{

    beforeEach(async () => {
        await truncate();
       
      });

    it('Should create a new brand',async()=>{

    
        const response = await request(app)
        .post(`/api/brands`).send({
            name:"Samsung"
        });

        expect(response.status).toBe(201)


    })

    it('Should not create a brand with invalid data',async()=>{

    
        const response = await request(app)
        .post(`/api/brands`).send({
            name:null
        });

        expect(response.status).toBe(400)


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

    it('should not delete a brand that does not exist',async()=>{

        const response = await request(app)
        .delete(`/api/brands/${null}`).send();

        expect(response.status).toBe(400)

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

    it('Should not update a brand that does not exist',async()=>{

        const response = await request(app)
        .put(`/api/brands/${null}/edit`).send({
            name:"Acer"
        });

        expect(response.status).toBe(400)

    })

    it('Should not update a brand with invalid data.',async()=>{

        
        const brandCreated = await brands.create({
            name:"Apple"
        });

        const response = await request(app)
        .put(`/api/brands/${brandCreated.id}/edit`).send({
            name:""
        });

        expect(response.status).toBe(400)
       

    })
})



describe('Categories Endpoints',()=>{

    beforeEach(async () => {
        await truncate();
       
      });

    it('Should create a new categorie',async()=>{

    
        const response = await request(app)
        .post(`/api/categories`).send({
            name:"Sapatos"
        });

        expect(response.status).toBe(201)


    })

    it('should not create a category with invalid data',async()=>{

    
        const response = await request(app)
        .post(`/api/categories`).send({
            name:""
        });

        expect(response.status).toBe(400)


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

    it('Should not delete a category that does not exist.',async()=>{


        const response = await request(app)
        .delete(`/api/categories/${null}`).send();

        expect(response.status).toBe(400)

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

    it('Should not update a category that does not exist.',async()=>{

        const response = await request(app)
        .put(`/api/categories/${null}/edit`).send({
            name:"Acer"
        });

        expect(response.status).toBe(400)
       

    })

    it('Should not update a category with invalid data.',async()=>{

        
        const categorieCreated = await categories.create({
            name:"Apple"
        });

        const response = await request(app)
        .put(`/api/categories/${categorieCreated.id}/edit`).send({
            name:null
        });

        expect(response.status).toBe(400)
       

    })
})



describe('Stock Endpoints',()=>{

    beforeEach(async () => {
        await truncate();
       
      });

    it('Should create a new stock',async()=>{

        const brandCreated = await brands.create({
            name:"Apple"
        });
    

        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const response = await request(app)
        .post(`/api/product/${productCreated.id}/stock`).send({
            quantity:456
        });

       

        expect(response.status).toBe(201)


    })

    it('should not create stock without a product.',async()=>{


        const response = await request(app)
        .post(`/api/product/${null}/stock`).send({
            quantity:456
        });


        expect(response.status).toBe(400)


    })

    it('Should not create a stock with invalid data.',async()=>{

        const brandCreated = await brands.create({
            name:"Apple"
        });
    

        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const response = await request(app)
        .post(`/api/product/${productCreated.id}/stock`).send({
            quantity:null
        });

       

        expect(response.status).toBe(400)


    })


    it('should return the stock of each product',async()=>{

        const brandCreated = await brands.create({
            name:"Apple"
        });
        

        
        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const stockCreated = await stock.create({
            id_product:productCreated.id,
            quantity:678

        })

        const response = await request(app)
        .get(`/api/product/${productCreated.id}/stock`).send();

        expect(response.status).toBe(200)
      

    })

    it('should not return stock of an invalid product',async()=>{


        const response = await request(app)
        .get(`/api/product/${null}/stock`).send();

        expect(response.status).toBe(400)
      

    })

    it('Should delete a stock.',async()=>{
        const brandCreated = await brands.create({
            name:"Apple"
        });
        

        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const stockCreated = await stock.create({
            id_product:productCreated.id,
            quantity:678

        })

        const response = await request(app)
        .delete(`/api/stock/${stockCreated.id}`).send();

        expect(response.status).toBe(200)

    })

    it('Should not delete a stock that does not exist.',async()=>{

        const response = await request(app)
        .delete(`/api/stock/${null}`).send();

        expect(response.status).toBe(400)

    })

    it('Should update a stock.',async()=>{

        const brandCreated = await brands.create({
            name:"Apple"
        });
       

        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const stockCreated = await stock.create({
            id_product:productCreated.id,
            quantity:678

        })

        const response = await request(app)
        .put(`/api/stock/${stockCreated.id}/edit`).send({
            quantity:90
        });

        expect(response.status).toBe(200)
       

    })

    it('Should not update stock that does not exist.',async()=>{


        const response = await request(app)
        .put(`/api/stock/${null}/edit`).send({
            quantity:90
        });

        expect(response.status).toBe(400)
       

    })

    it('Should not update a stock with invalid data.',async()=>{

        const brandCreated = await brands.create({
            name:"Apple"
        });
       

        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const stockCreated = await stock.create({
            id_product:productCreated.id,
            quantity:678

        })

        const response = await request(app)
        .put(`/api/stock/${stockCreated.id}/edit`).send({
            quantity:null
        });

        expect(response.status).toBe(400)
       

    })
})

describe('Cart Endpoints',()=>{

    beforeEach(async () => {
        await truncate();
       
      });

    it('should return the products in the cart.',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"j1111@gmail.com",
            password:"123456",
            cpf:"10005911000",
            phone_number:"12345678910"
        })

        const brandCreated = await brands.create({
            name:"Apple"
        });

        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const cartCreated = await carts.create({
            id_customers:createdCustomer.id
          })

          await cartCreated.addProducts(productCreated);

          const response = await request(app)
            .get("/api/cart")
            .set("authorization", `Bearer ${createdCustomer.generateToken()}`);

        expect(response.status).toBe(200)

    })

    it('should not return cart products if customer is not authenticated',async()=>{

          const response = await request(app)
            .get("/api/cart")
            .set("authorization", "Bearer " + jwt.sign({id:200},process.env.APP_SECRET,{expiresIn:86400}));

        expect(response.status).toBe(401)

    })

    it('should return an error if the cart is not found',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"j1121@gmail.com",
            password:"123456",
            cpf:"20005911000",
            phone_number:"12345678910"
        })


          const response = await request(app)
            .get("/api/cart")
            .set("authorization", `Bearer ${createdCustomer.generateToken()}`);

        expect(response.status).toBe(400)

    })

    it('should create a cart.',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"j2211@gmail.com",
            password:"123456",
            cpf:"10002211000",
            phone_number:"12345678910"
        })

        const brandCreated = await brands.create({
            name:"Apple"
        });

        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const cartCreated = await carts.create({
            id_customers:createdCustomer.id
          })

          const response = await request(app)
            .post(`/api/product/${productCreated.id}/cart`)
            .set("authorization", `Bearer ${createdCustomer.generateToken()}`);

        expect(response.status).toBe(200)

    })

    it('should not add a product that does not exist to cart.',async()=>{

        
          const response = await request(app)
            .post(`/api/product/${null}/cart`)
            .set("authorization", "Bearer " + jwt.sign({id:200},process.env.APP_SECRET,{expiresIn:86400}));

        expect(response.status).toBe(400)

    })

    it('should not add a product to cart if customer does not exist',async()=>{


        const brandCreated = await brands.create({
            name:"Apple"
        });

        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });


          const response = await request(app)
            .post(`/api/product/${productCreated.id}/cart`)
            .set("authorization", "Bearer " + jwt.sign({id:200},process.env.APP_SECRET,{expiresIn:86400}));

        expect(response.status).toBe(400)

    })

    it('Should remove a product from the cart.',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"j3@gmail.com",
            password:"123456",
            cpf:"10302211000",
            phone_number:"12345678910"
        })

        const brandCreated = await brands.create({
            name:"Apple"
        });

        const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const cartCreated = await carts.create({
            id_customers:createdCustomer.id
          })

          await cartCreated.addProducts(productCreated);

          const response = await request(app)
            .delete(`/api/product/${productCreated.id}/cart`)
            .set("authorization", `Bearer ${createdCustomer.generateToken()}`);

        expect(response.status).toBe(200)

    })

    it('Should not remove a product that does not exist from the cart.',async()=>{


          const response = await request(app)
            .delete(`/api/product/${null}/cart`)
            .set("authorization", "Bearer " + jwt.sign({id:200},process.env.APP_SECRET,{expiresIn:86400}));

        expect(response.status).toBe(400)

    })

})

describe('payment_methods Endpoints',()=>{

    beforeEach(async () => {
        await truncate();
       
      });

    it('Should create a payment_methods .',async()=>{

        const response = await request(app)
          .post(`/api/paymentMethods`).send({
            name:"Cartão",
            status:true
          })
          
      expect(response.status).toBe(200)

  })

  it('Should delete a payment_methods .',async()=>{

    const paymentMethodsCreated = await payment_methods.create({
        name:"Cartão",
        status:true
    })

    const response = await request(app)
      .delete(`/api/paymentMethods/${paymentMethodsCreated.id}`).send()
      
  expect(response.status).toBe(200)

})

it('Should not delete a payment method that does not exist.',async()=>{


    const response = await request(app)
      .delete(`/api/paymentMethods/${null}`).send()
      
  expect(response.status).toBe(400)

})

it('Should update a payment_methods .',async()=>{

    const paymentMethodsCreated = await payment_methods.create({
        name:"Cartão",
        status:true
    })

    const response = await request(app)
      .put(`/api/paymentMethods/${paymentMethodsCreated.id}/edit`).send({
        name:"Boleto",
      })
      
  expect(response.status).toBe(200)

})

it('should not update a payment method with invalid information.',async()=>{

    const paymentMethodsCreated = await payment_methods.create({
        name:"Cartão",
        status:true
    })

    const response = await request(app)
      .put(`/api/paymentMethods/${paymentMethodsCreated.id}/edit`).send({
        name:"",
      })
      
  expect(response.status).toBe(400)

})

it('Should not update a payment method that does not exist.',async()=>{

    const response = await request(app)
      .put(`/api/paymentMethods/${null}/edit`).send({
        name:"Boleto",
      })
      
  expect(response.status).toBe(400)

})

it('Should return all payment methods.',async()=>{

    const response = await request(app)
      .get(`/api/paymentMethods`).send()
      
  expect(response.status).toBe(200)

})
})

describe('Sales History Endpoints',()=>{

    beforeEach(async () => {
        await truncate();
       
      });


    it('Should return all seles historys.',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"hhhh@gmail.com",
            password:"123456",
            cpf:"22235911999",
            phone_number:"12345678910"
        })

        const paymentMethodsCreated = await payment_methods.create({
            name:"Cartão",
            status:true
         })

         const brandCreated = await brands.create({
            name:"Apple"
        });

         const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const cartCreated = await carts.create({
            id_customers:createdCustomer.id
          })

          await cartCreated.addProducts(productCreated);

       const sale = await sales_historys.create({
            id_customers:createdCustomer.id,
            id_payment_methods:paymentMethodsCreated.id,
            amount:productCreated.price
         })

             //add products to sales_history_products
            await sale.addProducts(productCreated)
        
         
        const response = await request(app)
        .get(`/api/salesHistorys`)
        .set("authorization", `Bearer ${createdCustomer.generateToken()}`);

         expect(response.status).toBe(200)

    })

    it('Should create seles historys.',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"j65466@gmail.com",
            password:"123456",
            cpf:"22278331666",
            phone_number:"12345678910"
        })

        const paymentMethodsCreated = await payment_methods.create({
            name:"Cartão",
            status:true
         })

         const brandCreated = await brands.create({
            name:"Apple"
        });

         const productCreated = await products.create({
            "name":"Ventilador",
            "brand_id":brandCreated.id,
            "description":"Processador - mais poder em seus núcleos Com um processador",
            "price":987,
            "status":true,
        });

        const cartCreated = await carts.create({
            id_customers:createdCustomer.id
          })

          await cartCreated.addProducts(productCreated);
        
         
        const response = await request(app)
        .post(`/api/salesHistorys`)
        .set("authorization", `Bearer ${createdCustomer.generateToken()}`)
        .send({"id_payment_methods":paymentMethodsCreated.id});

         expect(response.status).toBe(200)

    })

    it('Should not create sales history if the customer is not authenticated.',async()=>{
        const response = await request(app)
        .post(`/api/salesHistorys`)
        .set("authorization", "Bearer " + jwt.sign({id:200},process.env.APP_SECRET,{expiresIn:86400}))
        

         expect(response.status).toBe(401)
    })

    it('should not create sales history if payment method does not exist',async()=>{

        const createdCustomer = await customers.create({
            first_name:"Hudson",
            last_name:"França",
            email_address:"h1311@gmail.com",
            password:"123456",
            cpf:"22225911000",
            phone_number:"12345678910"
        })

        const response = await request(app)
        .post(`/api/salesHistorys`)
        .set("authorization", `Bearer ${createdCustomer.generateToken()}`)
        .send({id_payment_methods:1234});

         expect(response.status).toBe(400)
    })


 it('Should delete a seles historys.',async()=>{

    const createdCustomer = await customers.create({
        first_name:"Hudson",
        last_name:"França",
        email_address:"hkhh@gmail.com",
        password:"123456",
        cpf:"22285911999",
        phone_number:"12345678910"
    })

    const paymentMethodsCreated = await payment_methods.create({
        name:"Cartão",
        status:true
     })

     const brandCreated = await brands.create({
        name:"Apple"
    });

     const productCreated = await products.create({
        "name":"Ventilador",
        "brand_id":brandCreated.id,
        "description":"Processador - mais poder em seus núcleos Com um processador",
        "price":987,
        "status":true,
    });

    const cartCreated = await carts.create({
        id_customers:createdCustomer.id
      })

      await cartCreated.addProducts(productCreated);

   const sale = await sales_historys.create({
        id_customers:createdCustomer.id,
        id_payment_methods:paymentMethodsCreated.id,
        amount:productCreated.price
     })

    
     
    const response = await request(app)
    .delete(`/api/salesHistorys/${sale.id}`)
    .set("authorization", `Bearer ${createdCustomer.generateToken()}`);

     expect(response.status).toBe(200)
    })

    it('should not delete a sale history that does not exist.',async()=>{
        const response = await request(app)
        .delete(`/api/salesHistorys/${12345}`)
        .set("authorization", "Bearer " + jwt.sign({id:200},process.env.APP_SECRET,{expiresIn:86400}))
        

         expect(response.status).toBe(400)
    })

    


})




