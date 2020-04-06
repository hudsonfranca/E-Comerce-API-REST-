# This readme is not yet finished.

# E-comerce REST API

## Install

yarn istall

## URLs

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
- [Get the list of products that are in the customer's cart.](#get-the-list-of-products-that-are-in-the-customer's-cart.)
- [Add products to the customer's cart](#add-products-to-the-customer's-cart)
- [Delete a product from the customer's cart](#delete-a-product-from-the-customer's-cart)
- [Edit the quantity of a product in the cart](#edit-the-quantity-of-a-product-in-the-cart)
- [Add a product to your favorites list](#add-a-product-to-your-favorites-list)
- [Get the customer's favorite product list](#get-the-customer's-favorite-product-list)
- [Create a order](#create-a-order)

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

## Get the list of products that are in the customer's cart.

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

## Add products to the customer's cart.

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

## Delete a product from the customer's cart

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

    To create a new order you will need to add products to the cart and you will also need a token.

### Request

`POST /api/orders`

    http://localhost:3333/api/orders

`HEADER`

    header =>  authorization, value => Bearer <Your token>

`BODY`

### Response

     Status: 200

    {
        "ok": true
    }