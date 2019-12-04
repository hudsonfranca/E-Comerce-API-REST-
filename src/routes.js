const routes = require('express').Router();
const CustomerController = require('./app/controllers/CustomerController');
const ProductController = require('./app/controllers/ProductController');
const AddressesController = require('./app/controllers/AddressesController');
const BrandController = require('./app/controllers/BrandController');
const CategorieController = require('./app/controllers/CategorieController');
const StockController = require('./app/controllers/StockController');
const CartController = require('./app/controllers/CartController');
const SessionController = require('./app/controllers/SessionController');
const PaymentMethodsController = require('./app/controllers/PaymentMethodsController');
const SalesHistorysController = require('./app/controllers/SalesHistorysController');
const authMiddleware = require('./app/middleware/auth')


//...............CUSTOMERS ROUTES..............................
routes.post('/api/customer',CustomerController.store);
routes.get('/api/customer',CustomerController.index);
routes.delete('/api/customer/:id',CustomerController.delete);
routes.put('/api/customer/:id/edit',CustomerController.update);

//...............PRODUCTS ROUTES..............................
routes.post('/api/categorie/:categorie_id/products',ProductController.store);
 routes.delete('/api/products/:id',ProductController.delete);
 routes.put('/api/products/:id/edit',ProductController.update);
 routes.get('/api/products',ProductController.index);


 //...............ADDRESSES ROUTES..............................
 routes.post('/api/customer/:customer_id/addresses',AddressesController.store);
 routes.get('/api/customer/:customer_id/addresses',AddressesController.index);
 routes.delete('/api/addresses/:id',AddressesController.delete);
 routes.put('/api/addresses/:id/edit',AddressesController.update);

 //...............BRAND ROUTES..............................
 routes.post('/api/brands',BrandController.store);
 routes.get('/api/brands',BrandController.index);
 routes.delete('/api/brands/:id',BrandController.delete);
 routes.put('/api/brands/:id/edit',BrandController.update);

 //...............CATEGORIES ROUTES..............................
 routes.post('/api/categories',CategorieController.store);
 routes.get('/api/categories',CategorieController.index);
 routes.delete('/api/categories/:id',CategorieController.delete);
 routes.put('/api/categories/:id/edit',CategorieController.update);

 
 //...............STOCK ROUTES..............................
 routes.post('/api/product/:id/stock',StockController.store);
 routes.get('/api/product/:id/stock',StockController.index);
 routes.delete('/api/stock/:id',StockController.delete);
 routes.put('/api/stock/:id/edit',StockController.update);

 //...............PAYMENT METHODS..............................
 routes.post('/api/paymentMethods',PaymentMethodsController.store);
 routes.get('/api/paymentMethods',PaymentMethodsController.index);
 routes.delete('/api/paymentMethods/:id',PaymentMethodsController.delete);
 routes.put('/api/paymentMethods/:id/edit',PaymentMethodsController.update);

 


 //................SESSION..................................
 routes.post('/api/sessions',SessionController.store)


//................AUTH MIDDLEWARE..................................
routes.use(authMiddleware)

 
 //...............CART ROUTES..............................
 routes.post('/api/product/:id/cart',CartController.store);
 routes.get('/api/cart',CartController.index);
 routes.delete('/api/product/:id/cart',CartController.delete);


  //...............SALES HISTORYS ROUTES..............................
  routes.post('/api/salesHistorys',SalesHistorysController.store);
  routes.get('/api/salesHistorys',SalesHistorysController.index);
  routes.delete('/api/salesHistorys/:id',SalesHistorysController.delete);
  //routes.put('/api/salesHistorys/:id/edit',SalesHistorysController.update);
 



module.exports = routes;
