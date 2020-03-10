const routes = require("express").Router();
const CustomerController = require("./app/controllers/CustomerController");
const AdminsController = require("./app/controllers/AdminsController");

const ProductController = require("./app/controllers/ProductController");
const AddressesController = require("./app/controllers/AddressesController");
const BrandController = require("./app/controllers/BrandController");
const CategorieController = require("./app/controllers/CategorieController");
const StockController = require("./app/controllers/StockController");
const CartController = require("./app/controllers/CartController");
const SessionController = require("./app/controllers/SessionController");
const PaymentMethodsController = require("./app/controllers/PaymentMethodsController");
const FavoritesController = require("./app/controllers/FavoritesController");
const OrderController = require("./app/controllers/OrderController");
const OrderByStatusController = require("./app/controllers/OrderByStatusController");
const CustomerPageController = require("./app/controllers/CustomerPageController");
const ImageController = require("./app/controllers/ImageController");
const OrdersPageController = require("./app/controllers/OrdersPageController");
const authMiddleware = require("./app/middleware/auth");

const multer = require("multer");
const uploadConfig = require("./config/upload");

const upload = multer(uploadConfig);

//...............CUSTOMERS ROUTES..............................
routes.post("/api/customer", CustomerController.store);
routes.get("/api/customer", CustomerController.index);
routes.get("/api/customer/search", CustomerController.show);
routes.delete("/api/customer/:id", CustomerController.delete);
routes.put("/api/customer/:id/edit", CustomerController.update);

//...............CUSTOMERS ROUTES..............................
routes.post("/api/customer", CustomerController.store);
routes.get("/api/customer", CustomerController.index);
routes.get("/api/customer/search", CustomerController.show);
routes.delete("/api/customer/:id", CustomerController.delete);
routes.put("/api/customer/:id/edit", CustomerController.update);

//...............ADMIN ROUTES..............................
routes.post("/api/admin", AdminsController.store);
routes.get("/api/admin", AdminsController.index);
routes.get("/api/admin/search", AdminsController.show);
routes.delete("/api/admin/:id", AdminsController.delete);
routes.put("/api/admin/:id/edit", AdminsController.update);

//...............CUSTOMERS FRONT END ADMIN ROUTES..............................
routes.get("/api/customer/:id", CustomerPageController.show);
routes.put(
  "/api/customer/:id_customer/addresses/:id_addresses/edit",
  CustomerPageController.update
);

//...............IMAGES..............................
routes.post(
  "/api/product/:id/images",
  upload.single("photos"),
  ImageController.store
);

routes.delete("/api/images/:id", ImageController.delete);

routes.get("/api/product/:id/images", ImageController.show);

//...............PRODUCTS ROUTES..............................
routes.post("/api/categorie/:categorie_id/products", ProductController.store);
routes.delete("/api/products/:id", ProductController.delete);
routes.put("/api/products/:id/edit", ProductController.update);
routes.get("/api/products", ProductController.index);
routes.get("/api/products/:id", ProductController.show);

//...............ADDRESSES ROUTES..............................
routes.post("/api/user/:user_id/addresses", AddressesController.store);
routes.get("/api/customer/:customer_id/addresses", AddressesController.index);
routes.delete("/api/addresses/:id", AddressesController.delete);
routes.put("/api/addresses/:id/edit", AddressesController.update);

//...............BRAND ROUTES..............................
routes.post("/api/brands", BrandController.store);
routes.get("/api/brands", BrandController.index);
routes.delete("/api/brands/:id", BrandController.delete);
routes.put("/api/brands/:id/edit", BrandController.update);

//...............CATEGORIES ROUTES..............................
routes.post("/api/categories", CategorieController.store);
routes.get("/api/categories", CategorieController.index);
routes.delete("/api/categories/:id", CategorieController.delete);
routes.put("/api/categories/:id/edit", CategorieController.update);

//...............STOCK ROUTES..............................
routes.post("/api/product/:id/stock", StockController.store);
routes.get("/api/product/:id/stock", StockController.show);
routes.get("/api/stock", StockController.index);
routes.delete("/api/stock/:id", StockController.delete);
routes.put("/api/stock/:id/edit", StockController.update);

//...............PAYMENT METHODS..............................
routes.post("/api/paymentMethods", PaymentMethodsController.store);
routes.get("/api/paymentMethods", PaymentMethodsController.index);
routes.delete("/api/paymentMethods/:id", PaymentMethodsController.delete);
routes.put("/api/paymentMethods/:id/edit", PaymentMethodsController.update);

//................SESSION..................................
routes.post("/api/sessions", SessionController.store);

//...............CART ROUTES..............................
routes.post("/api/product/:id/cart", authMiddleware, CartController.store);
routes.get("/api/cart", authMiddleware, CartController.index);
routes.delete("/api/product/:id/cart", authMiddleware, CartController.delete);

//...............FAVORITES ROUTES..............................
routes.post(
  "/api/product/:id/favorites",
  authMiddleware,
  FavoritesController.store
);
routes.get("/api/favorites", authMiddleware, FavoritesController.index);
routes.delete(
  "/api/product/:id/favorites",
  authMiddleware,
  FavoritesController.delete
);

//...............ORDERS ROUTES..............................
routes.post("/api/orders", authMiddleware, OrderController.store);
routes.get("/api/orders/index", authMiddleware, OrderController.index);
routes.delete("/api/orders/:id", authMiddleware, OrderController.delete);
routes.get("/api/orders/:id/show", authMiddleware, OrderController.show);
routes.get(
  "/api/orders/status/:name",
  authMiddleware,
  OrderByStatusController.show
);
routes.put("/api/order/:id/edit", OrderController.update);

module.exports = routes;
