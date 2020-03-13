const truncate = require("../utils/truncate");
const request = require("supertest");
const app = require("../../src/app");
const jwt = require("jsonwebtoken");
const {
  users,
  customers,
  orders,
  payment_methods,
  carts,
  orders_products,
  brands,
  categories,
  addresses,
  products
} = require("../../src/app/models");

describe("Orders Endpoints", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Should return all orders.", async () => {
    const createdUser = await users.create({
      first_name: "Hudson",
      last_name: "Silvares França ",
      email_address: "hudsonsilvares@gmail.com",
      password: "12345678",
      phone_number: "89816543301",
      cpf: "01345001022"
    });

    await customers.create({
      id: createdUser.id
    });

    createdUser.password = undefined;

    const customerAddress = {
      street_address: "Teste 1",
      city: "Dino City",
      zip: "12665",
      country: "Brasil",
      state: "ES"
    };

    await createdUser.createAddresses(customerAddress, {});

    const paymentMethodsCreated = await payment_methods.create({
      name: "Cartão",
      status: true
    });

    const brandCreated = await brands.create({
      name: "Apple"
    });

    const categorieCreated = await categories.create({ name: "Eletronics" });

    const productCreated = await products.create({
      name: "produto 1",
      brand_id: brandCreated.id,
      description: "Primeiro produtto",
      price: "78.67",
      status: true,
      categorie_id: categorieCreated.id
    });

    const cartCreated = await carts.create({
      id_customers: createdUser.id
    });

    await cartCreated.addProducts(productCreated);

    const orderCreated = await orders.create({
      id_customers: createdUser.id,
      id_payment_methods: paymentMethodsCreated.id,
      amount: productCreated.price,
      status: "panding"
    });

    //add products to orders_products
    await orders_products.create({
      id_orders: orderCreated.id,
      id_products: productCreated.id,
      quantity: 2
    });

    const response = await request(app)
      .get(`/api/orders/index`)
      .set("authorization", `Bearer ${createdUser.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("Should create orders.", async () => {
    const createdUser = await users.create({
      first_name: "Hudson",
      last_name: "Silvares França ",
      email_address: "hudsonsilvares@gmail.com",
      password: "12345678",
      phone_number: "89816543301",
      cpf: "01345001022"
    });

    await customers.create({
      id: createdUser.id
    });

    createdUser.password = undefined;

    const customerAddress = {
      street_address: "Teste 1",
      city: "Dino City",
      zip: "12665",
      country: "Brasil",
      state: "ES"
    };

    await createdUser.createAddresses(customerAddress, {});

    const paymentMethodsCreated = await payment_methods.create({
      name: "Cartão",
      status: true
    });

    const brandCreated = await brands.create({
      name: "Apple"
    });

    const categorieCreated = await categories.create({ name: "Eletronics" });

    const productCreated = await products.create({
      name: "produto 1",
      brand_id: brandCreated.id,
      description: "Primeiro produtto",
      price: "78.67",
      status: true,
      categorie_id: categorieCreated.id
    });

    const cartCreated = await carts.create({
      id_customers: createdUser.id
    });

    await cartCreated.addProducts(productCreated);

    const response = await request(app)
      .post(`/api/orders`)
      .set("authorization", `Bearer ${createdUser.generateToken()}`)
      .send({
        id_payment_methods: paymentMethodsCreated.id,
        quantity: [{ id: productCreated.id, qtd: 5 }],
        status: "Pending",
        orderAddress: {
          street_address: "Teste 1",
          city: "Dino City",
          zip: "12665",
          country: "Brasil",
          state: "ES"
        }
      });

    expect(response.status).toBe(200);
  });

  it("Should not create order if the customer is not authenticated.", async () => {
    const response = await request(app)
      .post(`/api/orders`)
      .set(
        "authorization",
        "Bearer " +
          jwt.sign({ id: 200 }, process.env.APP_SECRET, { expiresIn: 86400 })
      );

    expect(response.status).toBe(401);
  });

  it("should not create order if payment method does not exist", async () => {
    const createdUser = await users.create({
      first_name: "Hudson",
      last_name: "Silvares França ",
      email_address: "hudsonsilvares@gmail.com",
      password: "12345678",
      phone_number: "89816543301",
      cpf: "01345001022"
    });

    await customers.create({
      id: createdUser.id
    });

    createdUser.password = undefined;

    const customerAddress = {
      street_address: "Teste 1",
      city: "Dino City",
      zip: "12665",
      country: "Brasil",
      state: "ES"
    };

    await createdUser.createAddresses(customerAddress, {});

    const response = await request(app)
      .post(`/api/orders`)
      .set("authorization", `Bearer ${createdUser.generateToken()}`)
      .send({ id_payment_methods: 1234 });

    expect(response.status).toBe(400);
  });

  it("Should delete a order.", async () => {
    const createdUser = await users.create({
      first_name: "Hudson",
      last_name: "Silvares França ",
      email_address: "hudsonsilvares@gmail.com",
      password: "12345678",
      phone_number: "89816543301",
      cpf: "01345001022"
    });

    await customers.create({
      id: createdUser.id
    });

    createdUser.password = undefined;

    const customerAddress = {
      street_address: "Teste 1",
      city: "Dino City",
      zip: "12665",
      country: "Brasil",
      state: "ES"
    };

    await createdUser.createAddresses(customerAddress, {});

    const paymentMethodsCreated = await payment_methods.create({
      name: "Cartão",
      status: true
    });

    const brandCreated = await brands.create({
      name: "Apple"
    });

    const categorieCreated = await categories.create({ name: "Eletronics" });

    const productCreated = await products.create({
      name: "produto 1",
      brand_id: brandCreated.id,
      description: "Primeiro produtto",
      price: "78.67",
      status: true,
      categorie_id: categorieCreated.id
    });

    const cartCreated = await carts.create({
      id_customers: createdUser.id
    });

    await cartCreated.addProducts(productCreated);

    const orderCreated = await orders.create({
      id_customers: createdUser.id,
      id_payment_methods: paymentMethodsCreated.id,
      amount: productCreated.price,
      status: "panding"
    });

    //add products to orders_products
    await orders_products.create({
      id_orders: orderCreated.id,
      id_products: productCreated.id,
      quantity: 2
    });

    const response = await request(app)
      .delete(`/api/orders/${orderCreated.id}`)
      .set("authorization", `Bearer ${createdUser.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should not delete a order that does not exist.", async () => {
    const response = await request(app)
      .delete(`/api/orders/${12345}`)
      .set(
        "authorization",
        "Bearer " +
          jwt.sign({ id: 200 }, process.env.APP_SECRET, { expiresIn: 86400 })
      );

    expect(response.status).toBe(400);
  });
});
