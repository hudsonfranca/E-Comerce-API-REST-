const routes = require('express').Router();
const CustomerController = require('./app/controllers/CustomerController');
const ProductController = require('./app/controllers/ProductController');



//...............CUSTOMERS ROUTES..............................
routes.post('/api/customer',CustomerController.store);
routes.get('/api/customer',CustomerController.index);
routes.put('/api/customer/:id/edit',CustomerController.update);

//...............PRODUCTS ROUTES..............................
routes.post('/api/categorie/:categorie_id/products',ProductController.store);
 routes.delete('/api/products/:id',ProductController.delete);
 routes.put('/api/products/:id/edit',ProductController.update);



module.exports = routes;
