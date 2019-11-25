const routes = require('express').Router();
const CustomerController = require('./app/controllers/CustomerController');
const {Customer} = require('./app/models');



routes.post('/api/customer',CustomerController.store);
routes.get('/api/customer',CustomerController.index)



module.exports = routes;
