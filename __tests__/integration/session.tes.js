// const {customers} = require('../../src/app/models')
// const {brands} = require('../../src/app/models')
// const {products} = require('../../src/app/models')
// const request = require('supertest');
// const app = require('../../src/app')
// const truncate = require('../utils/truncate');
// const jwt = require('jsonwebtoken')

// describe('Authentication ',()=>{

//     beforeEach(async () => {
//         await truncate();
       
//       });

//     it('Should authenticate with valid credentials',async()=>{

//         const createdCustomer = await customers.create({
//             first_name:"Lucas",
//             last_name:"Santos",
//             email_address:"luca0s@gmail.com",
//             cpf:"10183906018",
//             phone_number:"104550815",
//             password:"12345"
//         })

       

//         const response = await request(app)
//         .post("/api/sessions")
//         .send({
//             email_address:createdCustomer.email_address,
//             password:"12345"
//         })
       
//         console.log(response.error);

//         expect(response.status).toBe(200);

//     })

//     it('Should not authenticate with invalid credentials',async()=>{

//         const createdCustomer = await customers.create({
//             first_name:"Lucas",
//             last_name:"Santos",
//             email_address:"luca@gmail.com",
//             cpf:"10183940008",
//             phone_number:"104640815",
//             password:"12345"
//         })

//         const response = await request(app)
//         .post("/api/sessions")
//         .send({
//             email_address:createdCustomer.email_address,
//             password:"7876"
//         })

       
       
//         expect(response.status).toBe(401);

//     })

//     it('Should return jwt token when authenticated',async()=>{

//         const createdCustomer = await customers.create({
//             first_name:"Lucas",
//             last_name:"Santos",
//             email_address:"lucas@gmail.com",
//             cpf:"10183946018",
//             phone_number:"104640815",
//             password:"12345"
//         })

//         const response = await request(app)
//         .post("/api/sessions")
//         .send({
//             email_address:createdCustomer.email_address,
//             password:"12345"
//         })
       
//         expect(response.body).toHaveProperty("token")

//     })

//     it("should be able to access private routes when authenticated", async () => {

//       const brandCreated = await brands.create({
//         name:"Apple"
//     });
   

//     const productCreated = await products.create({
//         "name":"Ventilador",
//         "brand_id":brandCreated.id,
//         "description":"Processador - mais poder em seus núcleos Com um processador",
//         "price":987,
//         "status":true,
//     });

//         const createdCustomer = await customers.create({
//             first_name:"Hudson",
//             last_name:"França",
//             email_address:"j10@gmail.com",
//             password:"123456",
//             cpf:"12001930000",
//             phone_number:"12345678910"
//         })
    
//         const response = await request(app)
//           .post(`/api/product/${productCreated.id}/cart`)
//           .set("authorization",`Bearer ${createdCustomer.generateToken()}`);

//           console.log({errorerror:response.error})
    
//         expect(response.status).toBe(200);
//       });

//       it("should not be able to access private routes without jwt token", async () => {
//         const response = await request(app).get("/api/cart");
    
//         expect(response.status).toBe(401);
//       });

//       it("should not be able to access private routes with invalid jwt token", async () => {
//         const response = await request(app)
//           .get("/api/cart")
//           .set("authorization", `Bearer 123123`);
    
//         expect(response.status).toBe(401);
//       });

//       it("Should not be able to access private routes with a malformed jwt", async () => {
//         const response = await request(app).get("/api/cart");
    
//         expect(response.status).toBe(401);
//       });

      

//       it("should not be able to access private routes with invalid jwt token", async () => {
//         const response = await request(app)
//           .get("/api/cart")
//           .set("authorization", `dog 123123`);
    
//         expect(response.status).toBe(401);
//       });

     

      


// })
