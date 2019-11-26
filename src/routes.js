const routes = require('express').Router();
const CustomerController = require('./app/controllers/CustomerController');




routes.post('/api/customer',CustomerController.store);
routes.get('/api/customer',CustomerController.index);
routes.put('/api/customer/:id/edit',CustomerController.update);



module.exports = routes;
