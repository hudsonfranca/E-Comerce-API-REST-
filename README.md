# A Rest Api for an E-Commerce made in Node.js

This Rest Api was built in Node.js and uses PostgreSQL as its database.

### Prerequisites

```
PostgreSQL
```

## How to use

Clone the application.

```bash
https://github.com/hudsonfranca/E-Comerce-API-REST-.git
```

Install dependencies
```
yarn install
```

Edit the .env file with your database connection parameters.


Create the database
```
yarn sequelize db:create
```

Create the database tables
```
npx sequelize-cli db:migrate
```

Add some initial data for Rest Api to work correctly.
```
sequelize db:seed:all
```

### Available Scripts

### `yarn start`

Runs the app.

### `yarn dev`

Runs the app in the development mode.

## ENDPOINTS

- [Create a session](#create-a-session)
- [Get list of customers](#get-list-of-customers)
- [Get a specific customer](#get-a-specific-customer)
- [Create a customer](#create-a-customer)
- [Delete a customer](#delete-a-customer)
- [Edit customer data](#edit-customer-data)
- [Get list of products](#get-list-of-products)
- [Get a specific product](#get-a-specific-product)
- [Get list of products by name](#get-list-of-products-by-name)
- [Create a product](#create-a-product)
- [Delete a product](#delete-a-product)
- [Edit product data](#edit-product-data)
- [Get list of brands](#get-list-of-brands)
- [Get a specific brand](#get-a-specific-brand)
- [Create a new brand](#create-a-new-brand)
- [Delete a brand](#delete-a-brand)
- [Edit brand data](#edit-brand-data)
- [Get list of categories](#get-list-of-categories)
- [Get a specific categorie](#get-a-specific-categorie)
- [Create a new categorie](#create-a-new-categorie)
- [Edit categorie data](#edit-categorie-data)
- [Delete a categorie](#delete-a-categorie)
- [Get list of stock](#get-list-of-stock)
- [Get a specific stock](#get-a-specific-stock)
- [Create a stock](#create-a-stock)
- [Delete a stock](#delete-a-stock)
- [Edit stock data](#edit-stock-data)
- [Get list of payment methods](#get-list-of-payment-methods)
- [Get a specific payment method](#get-a-specific-payment-method)
- [Create a new payment method](#create-a-new-payment-method)
- [Delete a payment method](#delete-a-payment-method)
- [Edit payment method](#edit-payment-method)
- [Get the list of products that are in the cart](#get-the-list-of-products-that-are-in-the-cart)
- [Add products to cart](#add-products-to-cart)
- [Delete a product from the cart](#delete-a-product-from-the-cart)
- [Edit the quantity of a product in the cart](#edit-the-quantity-of-a-product-in-the-cart)
- [Add a product to your favorites list](#add-a-product-to-your-favorites-list)
- [Get the customer's favorite product list](#get-the-customer's-favorite-product-list)
- [Create a order](#create-a-order)
- [Get list of orders for each customer](#get-list-of-orders-for-each-customer)
- [Get list of orders](#get-list-of-orders)
- [Delete a order](#delete-a-order)
- [Get a specific order](#get-a-specific-order)
- [Get order count by status](#get-order-count-by-status)
- [Update order status](#update-order-status)
- [Get all images of a product](#get-all-images-of-a-product)
- [Add an image to a product](#add-an-image-to-a-product)
- [Delete a image](#delete-a-image)
- [Create a admin](#create-a-admin)
- [Get list of admins](#get-list-of-admins)
- [Get a specific admin](#get-a-specific-admin)
- [Edit admin data](#edit-admin-data)
- [Delete a admin](#delete-a-admin)

## Create a session

### Request

`POST /api/sessions`

    http://localhost:3333/api/sessions

`BODY`

    {
        "email_address":"michael@gmail.com",
        "password":"12345678"
    }

### Response

    {
        "user": {
            "id": 6,
            "first_name": "Michael",
            "last_name": "Jackson",
            "email_address": "michael@gmail.com",
            "cpf": "01345001022",
            "phone_number": "89816543301",
            "createdAt": "2020-04-05T15:20:42.411Z",
            "updatedAt": "2020-04-05T19:45:56.038Z"
        },
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTg2MTMwNzA3LCJleHAiOjE1ODYyMTcxMDd9.FdaIAn6WoNOgZmEaiVG3T7cmcaV0brelajayFfiXGf4"
    }

---

## Get list of customers

### Request

`GET /api/customer?offset=<Your offset>&limit=<Your limit>`

    http://localhost:3333/api/customer?offset=0&limit=10

### Response

            {
            "count": 2,
            "rows": [
                {
                "id": 2,
                "User": {
                    "first_name": "Michael",
                    "last_name": "Jackson",
                    "email_address": "michael@gmail.com",
                    "cpf": "22222222222",
                    "phone_number": "27999999999",
                    "createdAt": "2020-04-01T22:36:33.267Z",
                    "Addresses": {
                    "id": 2,
                    "street_address": "25 Darwin Street",
                    "city": "New York",
                    "zip": "23400",
                    "country": "United states",
                    "state": "NY"
                    }
                }
                }
            ]
         }

## Get a specific customer

### Request

`GET /api/customer/:id/show`

    http://localhost:3333/api/customer/2/show

### Response

        {
            "id": 2,
            "User": {
                "first_name": "Michael",
                "last_name": "Jackson",
                "email_address": "michael@gmail.com",
                "cpf": "22222222222",
                "phone_number": "27999999999",
                "createdAt": "2020-04-01T22:36:33.267Z",
                "Addresses": {
                "id": 2,
                "street_address": "25 Darwin Street",
                "city": "New York",
                "zip": "23400",
                "country": "United states",
                "state": "NY"
                }
            }
        }

## Create a customer

### Request

`POST /api/customer`

    http://localhost:3333/api/customer

`BODY`

        {
            "first_name":"Michael",
            "last_name":"Jackson",
            "email_address":"michael@gmail.com",
            "password":"12345678",
            "phone_number":"89816543301",
            "cpf":"01345001022",
            "customerAddress":{
                "street_address":"25 Darwin Street",
                "city":"New York",
                "zip":"12665",
                "country":"United states",
                "state":"NY"
            }
        }

### Response

        {
            "user": {
                "id": 6,
                "first_name": "Michael",
                "last_name": "Jackson",
                "email_address": "michael@gmail.com",
                "cpf": "01345001022",
                "phone_number": "89816543301",
                "updatedAt": "2020-04-05T15:20:42.411Z",
                "createdAt": "2020-04-05T15:20:42.411Z"
            },
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.          eyJpZCI6NiwiaWF0IjoxNTg2MTAwMDUyLCJleHAiOjE1ODYxODY0NTJ9._suMxfI7XzDikaOPmBBh4UxVzK64UtdTggLLceECu1Q"
        }

## Delete a customer

### Request

`DELETE /api/customer/:id`

    http://localhost:3333/api/customer/6

### Response

    Status: 200

## Edit customer data

### Request

`PUT /api/customer/:id/edit`

    http://localhost:3333/api/customer/6/edit

`BODY`

        {
         "first_name":"Michael",
        "last_name":"Jackson",
        "email_address":"michael@gmail.com",
        "password":"12345678",
        "phone_number":"89816543301",
        "cpf":"01345001022",
        "street_address":"25 Darwin Street",
        "city":"New York",
        "zip":"12665",
        "country":"United states",
        "state":"NY"

        }

### Response

        [
            {
                "id": 6,
                "first_name": "Michael",
                "last_name": "Jackson",
                "cpf": "01345001022",
                "email_address": "michael@gmail.com",
                "phone_number": "89816543301",
                "createdAt": "2020-04-05T15:20:42.411Z",
                "updatedAt": "2020-04-05T15:48:49.410Z"
            }
        ]

---

## Get list of products

### Request

`GET /api/products?offset=<Your offset>&limit=<Your limit>`

    http://localhost:3333/api/products?offset=0&limit=10

### Response

        {
            "count": 4,
            "rows": [
                {
                "id": 5,
                "name": "Produto 3",
                "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
                "price": "3199.00",
                "status": true,
                "Images": [
                    {
                    "image": "http://localhost:3333/files/bike-1585883570365.jpg",
                    "id": 7,
                    "id_product": 5,
                    "aspect_ratio": "1.9"
                    }
                ],
                "Brand": {
                    "id": 7,
                    "name": "Apple"
                },
                "Categories": [
                    {
                    "id": 7,
                    "name": "Phones"
                    }
                ]
                }
            ]
        }

## Get a specific product

### Request

`GET /api/products/:id`

    http://localhost:3333/api/products/6

### Response

    {
        "id": 6,
        "name": "Produto de Teste",
        "description": "Tesde de quantidade",
        "price": "122.90",
        "status": true,
        "Images": [
            {
            "image": "http://localhost:3333/files/carro-1585870089081.jpeg",
            "id": 6,
            "id_product": 6,
            "aspect_ratio": "1.44"
            }
        ],
        "Brand": {
            "id": 7,
            "name": "Apple"
        },
        "Categories": [
            {
            "id": 7,
            "name": "Phones"
            }
        ]
    }

## Get list of products by name

### Request

`GET /api/find/product?name=<Product's name>&offset=<your offset>&limit=<your limit>`

    http://localhost:3333/api/find/product?name=Teste&offset=0&limit=10

### Response

        {
            "count": 4,
            "rows": [
                {
                "id": 5,
                "name": "Produto 3",
                "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
                "price": "3199.00",
                "status": true,
                "Images": [
                    {
                    "image": "http://localhost:3333/files/bike-1585883570365.jpg",
                    "id": 7,
                    "id_product": 5,
                    "aspect_ratio": "1.9"
                    }
                ],
                "Brand": {
                    "id": 7,
                    "name": "Apple"
                },
                "Categories": [
                    {
                    "id": 7,
                    "name": "Phones"
                    }
                ]
                }
            ]
        }

## Create a product

    Before creating a product you must create a category and a brand.

### Request

`POST /api/products`

    http://localhost:3333/api/products

`BODY`

    {
    "name": "Produto 5",
    "brand_id": 7,
    "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
    "price": "3199.00",
    "status": true,
    "categorie_id":7,
    "quantity":10
    }

### Response

    {
        "id": 8,
        "name": "Produto 5",
        "brand_id": 7,
        "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
        "price": "3199.00",
        "status": true,
        "updatedAt": "2020-04-05T12:57:23.793Z",
        "createdAt": "2020-04-05T12:57:23.793Z"
    }

## Delete a product

### Request

`DELETE /api/products/:id`

    http://localhost:3333/api/products/8

### Response

    Status: 200

## Edit product data

### Request

`PUT /api/products/:id/edit`

    http://localhost:3333/api/products/7/edit

`BODY`

        {
           "name": "Product",
            "brand_id": 7,
            "description": "Aspire 5 A515-52-56A8Sistema...",
            "price": "3199.00",
            "status": true,
            "Categories":8
        }

### Response

        [
            {
                "id": 7,
                "name": "Product",
                "brand_id": 7,
                "description": "Aspire 5 A515-52-56A8Sistema...",
                "price": "3199.00",
                "status": true,
                "createdAt": "2020-04-05T12:40:43.573Z",
                "updatedAt": "2020-04-05T19:40:28.349Z"
            }
        ]

---

## Get list of brands

### Request

`GET /api/brands`

    http://localhost:3333/api/brands

### Response

        [
            {
                "id": 7,
                "name": "Apple"
            },
            {
                "id": 8,
                "name": "Samsung"
            }
        ]

## Get a specific brand

### Request

`GET /api/brands/:id`

    http://localhost:3333/api/brands/9

### Response

    {
        "id": 9,
        "name": "Microsoft"
    }

## Create a new brand

### Request

`POST /api/brands`

    http://localhost:3333/api/brands

`BODY`

    {
        "name":"Apple"
    }

### Response

    {
        "id": 13,
        "name": "Apple",
        "updatedAt": "2020-04-05T20:27:28.747Z",
        "createdAt": "2020-04-05T20:27:28.747Z"
    }

## Delete a brand

### Request

`DELETE /api/brands/:id`

    http://localhost:3333/api/brands/13

### Response

    Status: 200

## Edit brand data

### Request

`PUT /api/brands/:id/edit`

    http://localhost:3333/api/brands/14

`BODY`

    {
        "name":"Apple"
    }

### Response

    [
        {
            "id": 14,
            "name": "Apple",
            "createdAt": "2020-04-05T20:39:08.505Z",
            "updatedAt": "2020-04-05T20:39:44.323Z"
        }
    ]

---

## Get list of categories

### Request

`GET /api/categories`

    http://localhost:3333/api/categories

### Response

    [
        {
            "id": 7,
            "name": "Phones"
        },
        {
            "id": 8,
            "name": "Computer"
        },

    ]

## Get a specific categorie

### Request

`GET /api/categories/:id`

    http://localhost:3333/api/categories/12

### Response

    {
        "id": 12,
        "name": "Home"
    }

## Create a new categorie

### Request

`POST /api/categories`

    http://localhost:3333/api/categories

`BODY`

    {
        "name":"Eletronics"
    }

### Response

    {
        "id": 13,
        "name": "Eletronics",
        "updatedAt": "2020-04-05T20:58:53.684Z",
        "createdAt": "2020-04-05T20:58:53.684Z"
    }

## Edit categorie data

### Request

`PUT /api/categories/:id/edit`

    http://localhost:3333/api/categories/13/edit

`BODY`

    {
        "name":"Informatica"
    }

### Response

    [
        {
            "id": 13,
            "name": "Home",
            "createdAt": "2020-04-05T20:58:53.684Z",
            "updatedAt": "2020-04-05T21:35:37.672Z"
        }
    ]

## Delete a categorie

### Request

`DELETE /api/categories/:id`

    http://localhost:3333/api/categories/13

### Response

    Status: 200

---

## Get list of stock

### Request

`GET /api/stock?offset=<Your offset>&limit=<Your limit>`

    http://localhost:3333/api/stock?offset=0&limit=10

### Response

    {
    "count": 4,
    "rows": [
        {
        "name": "Produto 3",
        "Stock": {
            "id": 1,
            "quantity": 200,
            "id_product": 5
        }
        }
    ]
    }

## Get a specific stock

### Request

`GET /api/product/:id/stock`

`:id => Product Id`

    http://localhost:3333/api/product/5/stock

### Response

     {
        "name": "Product 5",
        "Stock": {
            "id": 1,
            "quantity": 200,
            "id_product": 5
        }
    }

## Create a stock

    When you create a new product the quantity field will create a stock for the product.

## Delete a stock

### Request

`DELETE /api/stock/:id`

`:id => Stock Id`

    http://localhost:3333/api/stock/2

### Response

    Status: 200

## Edit stock data

### Request

`PUT /api/stock/:id/edit`

`:id => stock Id`

    http://localhost:3333/api/stock/1/edit

`BODY`

    {
        "quantity":550
    }

### Response

    [
        {
            "id": 1,
            "quantity": 550,
            "id_product": 5,
            "createdAt": "2020-04-02T23:12:39.760Z",
            "updatedAt": "2020-04-05T22:39:06.940Z"
        }
    ]

---

## Get list of payment methods

### Request

`GET /api/paymentMethods`

    http://localhost:3333/api/paymentMethods

### Response

    [
        {
            "id": 3,
            "name": "Card",
            "status": true,
            "createdAt": "2020-03-30T01:04:10.232Z",
            "updatedAt": "2020-03-30T01:04:10.232Z"
        }
    ]

## Get a specific payment method

### Request

`GET /api/paymentMethods/:id`

    http://localhost:3333/api/paymentMethods/4

### Response

    {
        "id": 4,
        "name": "Card",
        "status": true,
        "createdAt": "2020-04-01T21:53:44.750Z",
        "updatedAt": "2020-04-01T21:53:44.750Z"
    }

## Create a new payment method

### Request

`POST /api/paymentMethods`

    http://localhost:3333/api/paymentMethods

`BODY`

        {
            "name":"Credit card.",
            "status":true
        }

### Response

    {
        "id": 5,
        "status": true,
        "name": "Credit card.",
        "updatedAt": "2020-04-05T23:17:37.477Z",
        "createdAt": "2020-04-05T23:17:37.477Z"
    }

## Delete a payment method

### Request

`DELETE /api/paymentMethods/:id`

    http://localhost:3333/api/paymentMethods/4

### Response

    Status: 200

## Edit payment method

### Request

`PUT /api/paymentMethods/:id/edit`

    http://localhost:3333/api/paymentMethods/3/edit

`BODY`

    {
        "name":"Credit card",
        "status":true
    }

### Response

    [
        {
            "id": 3,
            "name": "Credit card",
            "status": true,
            "createdAt": "2020-03-30T01:04:10.232Z",
            "updatedAt": "2020-04-05T23:42:51.541Z"
        }
    ]

---

## Get the list of products that are in the cart

    You will need a token to access each customer's cart, create a session or a new customer to get a token.

### Request

`GET /api/cart`

    http://localhost:3333/api/cart

`HEADER`

    header =>  authorization, value => Bearer <Your token>

### Response

    [
        {
            "id": 1,
            "name": "Notebook Acer Aspire 5 A515-52-56A8 Intel® Core™ i5-8265U 8ªGeração RAM de 8GB SSD de 128 GB HD de 1TB Tela de 15.6 Windows 10",
            "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
            "price": "3199.00",
            "status": true,
            "Images": [
                {
                    "image": "http://localhost:3333/files/2-1585778328129.jpg",
                    "id": 2,
                    "id_product": 1,
                    "aspect_ratio": "1.9"
                },
                {
                    "image": "http://localhost:3333/files/1-1585778319566.jpg",
                    "id": 1,
                    "id_product": 1,
                    "aspect_ratio": "1.9"
                }
            ],
            "cart_products": {
            "quantity": 5
            }
        }
    ]

## Add products to cart

    You will need a token to add products to a specific customer's cart, create a session or a new customer to get a token.

### Request

`POST /api/product/:id/cart`

    http://localhost:3333/api/product/1/cart

`HEADER`

    header =>  authorization, value => Bearer <Your token>

### Response

    {
        "id": 3,
        "id_customers": 6,
        "updatedAt": "2020-04-06T00:15:01.819Z",
        "createdAt": "2020-04-06T00:15:01.819Z"
    }

## Delete a product from the cart

    You will need a token to delete a product from a cart, create a session or a new customer to get a token.

### Request

`DELETE /api/product/:id/cart`

    http://localhost:3333/api/product/2/cart

`HEADER`

    header =>  authorization, value => Bearer <Your token>

### Response

    Status: 200

## Edit the quantity of a product in the cart

    You will need a token to edit the quantity of a product that is in a cart, create a session or a new customer to get a token.

`PUT /api/product/:id/cart`

`:id => product Id`

    http://localhost:3333/api/product/1/cart

`HEADER`

    header =>  authorization, value => Bearer <Your token>

### Response

    [
        {
            "id": 6,
            "id_cart": 3,
            "id_product": 1,
            "quantity": 10,
            "createdAt": "2020-04-06T00:15:01.900Z",
            "updatedAt": "2020-04-06T01:30:08.908Z"
        }
    ]

---

## Add a product to your favorites list

    You will need a token to add a product to a customer's favorite list, create a session or a new customer to get a token.

`POST /api/product/:id/favorites`

    http://localhost:3333/api/product/1/favorites

`HEADER`

    header =>  authorization, value => Bearer <Your token>

### Response

    {
        "id": 3,
        "id_customers": 6,
        "updatedAt": "2020-04-06T01:51:48.327Z",
        "createdAt": "2020-04-06T01:51:48.327Z"
    }

## Get the customer's favorite product list

    You will need a token to access a customer's list of favorite products, create a session or a new customer to get a token.

### Request

`GET /api/favorites`

    http://localhost:3333/api/favorites

`HEADER`

    header =>  authorization, value => Bearer <Your token>

### Response

    {
        "Products": [
            {
            "id": 1,
            "name": "Notebook Acer Aspire 5 A515-52-56A8 Intel® Core™ i5-8265U 8ªGeração RAM de 8GB SSD de 128 GB HD de 1TB Tela de 15.6 Windows 10",
            "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
            "price": "3199.00",
            "status": true,
            "Images": [
                {
                "image": "http://localhost:3333/files/2-1585778328129.jpg",
                "id": 2,
                "id_product": 1,
                "aspect_ratio": "1.9"
                },
                {
                "image": "http://localhost:3333/files/1-1585778319566.jpg",
                "id": 1,
                "id_product": 1,
                "aspect_ratio": "1.9"
                }
            ]
            }
        ]
    }

---

## Create a order

    To create an order, you will need to add products to the cart, create a payment method and you will also need a token. create a session or a new client to obtain a token.

### Request

`POST /api/orders`

    http://localhost:3333/api/orders

`HEADER`

    header =>  authorization, value => Bearer <Your token>

`BODY`

     {
          id_payment_methods: 1,
          status: "On hold",
          orderAddress: {
            "street_address":"25 Darwin Street",
            "city":"New York",
            "zip":"12665",
            "country":"United states",
            "state":"NY"
          }
    }

### Response

     Status: 200

    {
        "ok": true
    }

## Get list of orders for each customer

    To obtain the list of orders for each customer, you will need a token. Create a session or a new customer to get a token.

### Request

`GET /api/orders`

    http://localhost:3333/api/orders

`HEADER`

    header =>  authorization, value => Bearer <Your token>

### Response

    [
        {
            "id": 4,
            "id_customers": 6,
            "id_payment_methods": 6,
            "status": "On hold",
            "amount": "31990.00",
            "created_at": "2020-04-06T02:36:07.950Z",
            "Products": [
            {
                "id": 1,
                "name": "Notebook Acer Aspire 5 A515-52-56A8 Intel® Core™ i5-8265U 8ªGeração RAM de 8GB SSD de 128 GB HD de 1TB Tela de 15.6 Windows 10",
                "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
                "price": "3199.00",
                "status": true,
                "Images": [
                {
                    "image": "http://localhost:3333/files/2-1585778328129.jpg",
                    "id": 2,
                    "id_product": 1,
                    "aspect_ratio": "1.9"
                },
                {
                    "image": "http://localhost:3333/files/1-1585778319566.jpg",
                    "id": 1,
                    "id_product": 1,
                    "aspect_ratio": "1.9"
                }
                ],
                "orders_products": {
                "quantity": 10
                }
            }
            ],
            "OrdersAddresse": {
            "id": 9,
            "street_address": "25 Darwin Street",
            "city": "New York",
            "zip": "12665",
            "country": "United states",
            "state": "NY"
            },
            "Customers": {
            "id": 6,
            "User": {
                "id": 6,
                "first_name": "Michael",
                "last_name": "Jackson",
                "email_address": "michael@gmail.com"
            }
            }
        }
    ]

## Get list of orders

    To obtain the list of orders you will need a token. Create a session or a new customer to get a token.

### Request

`GET /api/orders/index?offset=<Your offset>&limit=<Your limit>`

    http://localhost:3333/api/orders/index?offset=0&limit=10

`HEADER`

    header =>  authorization, value => Bearer <Your token>

### Response

    {
        "count": 1,
        "rows": [
            {
            "id": 1,
            "id_customers": 2,
            "id_payment_methods": 3,
            "status": "Completed",
            "amount": "6398.00",
            "created_at": "2020-04-01T23:43:03.243Z",
            "Products": [
                {
                "id": 1,
                "name": "Notebook Acer Aspire 5 A515-52-56A8 Intel® Core™ i5-8265U 8ªGeração RAM de 8GB SSD de 128 GB HD de 1TB Tela de 15.6 Windows 10",
                "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
                "price": "3199.00",
                "status": true,
                "Images": [
                    {
                    "image": "http://localhost:3333/files/2-1585778328129.jpg",
                    "id": 2,
                    "id_product": 1,
                    "aspect_ratio": "1.9"
                    },
                    {
                    "image": "http://localhost:3333/files/1-1585778319566.jpg",
                    "id": 1,
                    "id_product": 1,
                    "aspect_ratio": "1.9"
                    }
                ],
                "orders_products": {
                    "quantity": 2
                }
                }
            ],
            "OrdersAddresse": {
                "id": 5,
                "street_address": "Rua A n°28 Boa Vista",
                "city": "Linhares",
                "zip": "7897",
                "country": "Brasil",
                "state": "ES"
            },
            "Customers": {
                "id": 2,
                "User": {
                "id": 2,
                "first_name": "Hudson",
                "last_name": "Silvares França Gama",
                "email_address": "hudson@gmail.com"
                }
            }
            }
        ]
    }

## Delete a order

### Request

`DELETE /api/orders/:id`

    http://localhost:3333/api/orders/4

### Response

    Status: 200

## Get a specific order

`GET /api/orders/:id/show`

    http://localhost:3333/api/orders/1/show

### Response

        {
            "id": 1,
            "id_customers": 2,
            "id_payment_methods": 3,
            "status": "Completed",
            "amount": "6398.00",
            "created_at": "2020-04-01T23:43:03.243Z",
            "Products": [
                {
                "id": 1,
                "name": "Notebook Acer Aspire 5 A515-52-56A8 Intel® Core™ i5-8265U 8ªGeração RAM de 8GB SSD de 128 GB HD de 1TB Tela de 15.6 Windows 10",
                "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
                "price": "3199.00",
                "status": true,
                "orders_products": {
                    "quantity": 2
                }
                }
            ],
            "OrdersAddresse": {
                "id": 5,
                "street_address": "Rua A n°28 Boa Vista",
                "city": "Linhares",
                "zip": "7897",
                "country": "Brasil",
                "state": "ES"
            },
            "Customers": {
                "id": 2,
                "User": {
                "id": 2,
                "first_name": "Hudson",
                "last_name": "Silvares França Gama",
                "email_address": "hudson@gmail.com"
                }
            }
        }

## Get order count by status

`GET /api/orders/status/:name`

    http://localhost:3333/api/orders/status/Completed

### Response

    {
        "count": 1,
        "rows": [
            {
            "id": 1,
            "id_customers": 2,
            "id_payment_methods": 3,
            "status": "Completed",
            "amount": "6398.00",
            "created_at": "2020-04-01T23:43:03.243Z",
            "Products": [
                {
                "id": 1,
                "name": "Notebook Acer Aspire 5 A515-52-56A8 Intel® Core™ i5-8265U 8ªGeração RAM de 8GB SSD de 128 GB HD de 1TB Tela de 15.6 Windows 10",
                "description": "Aspire 5 A515-52-56A8Sistema OperacionalWindows 10 Home 64 bitsCPU e chipsetIntel® Core™ i5-8265U 8ª geração Quad CoreFrequência: 1,6 GHz a 3,9 GHz (turbo max)6 MB de SmartCacheMemória RAM8 GB (1x8GB) DDR4Até 2400 MHzExpansível a 32...",
                "price": "3199.00",
                "status": true,
                "orders_products": {
                    "quantity": 2
                }
                }
            ],
            "OrdersAddresse": {
                "id": 5,
                "street_address": "Rua A n°28 Boa Vista",
                "city": "Linhares",
                "zip": "7897",
                "country": "Brasil",
                "state": "ES"
            },
            "Customers": {
                "id": 2,
                "User": {
                "id": 2,
                "first_name": "Hudson",
                "last_name": "Silvares França Gama",
                "email_address": "hudson@gmail.com"
                }
            }
            }
        ]
    }

## Update order status

### Request

`PUT /api/order/:id/edit`

    http://localhost:3333/api/order/1/edit

`BODY`

    {
        "status":"On hold"
    }

### Response

    [
        {
            "id": 1,
            "id_customers": 2,
            "id_payment_methods": 3,
            "amount": "6398.00",
            "status": "On hold",
            "createdAt": "2020-04-01T23:43:03.243Z",
            "updatedAt": "2020-04-07T00:05:03.175Z"
        }
    ]

---

## Get all images of a product

`GET /api/product/:id/images`

`:id => product id`

    http://localhost:3333/api/product/1/images

### Response

    [
        {
            "image": "http://localhost:3333/files/1-1585778319566.jpg",
            "id": 1,
            "id_product": 1,
            "aspect_ratio": "1.9"
        },
        {
            "image": "http://localhost:3333/files/2-1585778328129.jpg",
            "id": 2,
            "id_product": 1,
            "aspect_ratio": "1.9"
        }
    ]

## Add an image to a product

    Add one image at a time.

`GET /api/product/:id/images/:aspect_ratio`

`:id => Product id`

```javascript
const imageFormData = new FormData();

//imageFile => Your image
imageFormData.append("image", imageFile);

await api.post(`/api/product/1/images/1.2`, imageFormData);
```

### Response

    {
        "image": "http://localhost:3333/files/bike-1585883570365.jpg",
        "id": 7,
        "id_product": 1,
        "aspect_ratio": "1.9",
        "updatedAt": "2020-04-03T03:12:50.462Z",
        "createdAt": "2020-04-03T03:12:50.462Z"
    }

## Delete a image

### Request

`DELETE /api/images/:id`

    http://localhost:3333/api/images/7

### Response

    Status: 200

---

## Create a admin

### Request

`POST /api/admin`

    http://localhost:3333/api/admin

`BODY`

    {
        "first_name":"Steve",
        "last_name":"Jobs",
        "email_address":"stevejobs@gmail.com",
        "password":"12345678",
        "phone_number":"89816543301",
        "cpf":"01345001033",
        "adminAddress":{
            "street_address":"25 Darwin Street",
            "city":"New York",
            "zip":"12665",
            "country":"United states",
            "state":"NY"
        },
        "type":"Boss"
    }

### Response

     {
        "user": {
            "id": 8,
            "first_name": "Steve",
            "last_name": "Jobs",
            "email_address": "stevejobs@gmail.com",
            "cpf": "01345001033",
            "phone_number": "89816543301",
            "updatedAt": "2020-04-07T23:31:06.588Z",
            "createdAt": "2020-04-07T23:31:06.588Z"
        },
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTg2MzAyMjc1LCJleHAiOjE1ODYzODg2NzV9.9DY_zxKvaPxNT3VCfzzrURFciHPAdNT6QmjL3-AF0kg"
     }

## Get list of admins

### Request

`GET /api/admin`

    http://localhost:3333/api/admin

### Response

    [
        {
            "id": 8,
            "type": "Boss",
            "User": {
            "first_name": "Steve",
            "last_name": "Jobs",
            "email_address": "stevejobs@gmail.com",
            "cpf": "01345001033",
            "phone_number": "89816543301",
            "createdAt": "2020-04-07T23:31:06.588Z",
            "Addresses": {
                "street_address": "25 Darwin Street",
                "city": "New York",
                "zip": "12665",
                "country": "United states",
                "state": "NY"
            }
            }
        }
    ]

## Get a specific admin

### Request

`GET /api/admin/:id`

    http://localhost:3333/api/admin/8

### Response

    {
        "id": 8,
        "type": "Boss",
        "User": {
            "first_name": "Steve",
            "last_name": "Jobs",
            "email_address": "stevejobs@gmail.com",
            "cpf": "01345001033",
            "phone_number": "89816543301",
            "createdAt": "2020-04-07T23:31:06.588Z",
            "Addresses": {
            "street_address": "25 Darwin Street",
            "city": "New York",
            "zip": "12665",
            "country": "United states",
            "state": "NY"
            }
        }
    }

## Edit admin data

### Request

`PUT /api/admin/:id/edit`

    http://localhost:3333/api/admin/8/edit

`BODY`

    {
        "first_name":"Hudson 2",
        "last_name":"Jobs",
        "email_address":"stevejobs0@gmail.com",
        "password":"12345678",
        "phone_number":"89816543301",
        "cpf": "01345001039",
        "street_address":"25 Darwin Street",
        "city":"RIO",
        "zip":"12665",
        "country":"United states",
        "state":"NY",
        "type":"Employe"

    }

### Response

    [
        {
            "id": 8,
            "first_name": "Hudson 2",
            "last_name": "Jobs",
            "cpf": "01345001033",
            "email_address": "stevejobs1@gmail.com",
            "phone_number": "89816543301",
            "createdAt": "2020-04-07T23:31:06.588Z",
            "updatedAt": "2020-04-08T00:08:54.196Z"
        }
    ]

## Delete a admin

### Request

`DELETE /api/admin/:id`

    http://localhost:3333/api/admin/7

### Response

### Response

    Status: 200
