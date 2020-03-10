const Decimal = require("decimal.js");
const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;
const {
  orders,
  payment_methods,
  orders_products,
  customers,
  products,
  carts,
  addresses
} = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const response = await sequelize.transaction(async t => {
        const allOrders = await orders.findAndCountAll(
          {
            attributes: [
              "id",
              "id_customers",
              "id_payment_methods",
              "status",
              "amount"
            ],
            include: [
              {
                association: "Products",
                attributes: ["id", "name", "description", "price", "status"],
                through: {
                  attributes: ["quantity"]
                }
              },
              {
                association: "OrdersAddresse",
                attributes: [
                  "id",
                  "street_address",
                  "city",
                  "zip",
                  "country",
                  "state"
                ]
              },
              {
                association: "Customers",
                attributes: ["id"],
                include: [
                  {
                    association: "User",
                    attributes: [
                      "id",
                      "first_name",
                      "last_name",
                      "email_address"
                    ]
                  }
                ]
              }
            ],
            distinct: true
          },
          { transaction: t }
        );

        return allOrders;
      });

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "unable to return orders" });
      console.log(err);
      return;
    }
  },
  async show(req, res) {
    const { id } = req.params;
    try {
      const response = await sequelize.transaction(async t => {
        const allOrders = await orders.findByPk(
          id,
          {
            attributes: [
              "id",
              "id_customers",
              "id_payment_methods",
              "status",
              "amount"
            ],
            include: [
              {
                association: "Products",
                attributes: ["id", "name", "description", "price", "status"],
                through: {
                  attributes: ["quantity"]
                }
              },
              {
                association: "OrdersAddresse",
                attributes: [
                  "id",
                  "street_address",
                  "city",
                  "zip",
                  "country",
                  "state"
                ]
              },
              {
                association: "Customers",
                attributes: ["id"],
                include: [
                  {
                    association: "User",
                    attributes: [
                      "id",
                      "first_name",
                      "last_name",
                      "email_address"
                    ]
                  }
                ]
              }
            ]
          },
          { transaction: t }
        );
        return allOrders;
      });

      res.status(200).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to return this order" + err });
      console.log(err);
      return;
    }
  },
  async store(req, res) {
    const { id_payment_methods, status, quantity, orderAddress } = req.body;

    const findCustomer = await customers.findByPk(req.userId);
    const findPaymentMethods = await payment_methods.findByPk(
      id_payment_methods
    );

    if (!findCustomer) {
      res.status(401).json({ error: "Sign in or create an account." });
      return;
    } else if (!findPaymentMethods) {
      res.status(400).json({ error: "This Payment Method dos not exist" });
      return;
    }

    try {
      await sequelize.transaction(async t => {
        const customerCartProducts = await carts.findOne({
          attributes: [],
          where: { id_customers: findCustomer.id },
          transaction: t,
          include: {
            association: "Products",
            attributes: ["id", "name", "description", "price", "status"],
            through: {
              attributes: []
            }
          }
        });

        if (!customerCartProducts) {
          res.status(400).json({ error: "Your cart is empty" });
          return;
        }

        const validProducts = customerCartProducts.Products.filter(product => {
          return product.status === true;
        });

        const amount = validProducts.reduce((prevVal, elem) => {
          const productQuantity = quantity.filter(product => {
            return elem.id === product.id;
          });

          const priceByQuantity = new Decimal(productQuantity[0].qtd).mul(
            elem.price
          );

          return new Decimal(prevVal).plus(priceByQuantity);
        }, 0);

        const orderCreated = await orders.create(
          {
            id_customers: findCustomer.id,
            id_payment_methods,
            amount,
            status
          },
          { transaction: t }
        );

        if (orderCreated) {
          const addProductToOrder = await Promise.all(
            validProducts.map(async product => {
              let findProduct = await products.findByPk(product.id);

              const productQuantity = quantity.filter(product => {
                return findProduct.id === product.id;
              });

              await orders_products.create(
                {
                  id_orders: orderCreated.id,
                  id_products: findProduct.id,
                  quantity: productQuantity[0].qtd
                },
                { transaction: t }
              );
            })
          );

          await orderCreated.createOrdersAddresse(orderAddress);

          if (addProductToOrder) {
            //Clear Cart
            await carts.destroy({
              where: { id_customers: findCustomer.id },
              transaction: t
            });
          }
        }
      });
      res.json({ ok: true });
      return;
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Unable to register this order." });
      return;
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    const findOrder = await orders.findByPk(id);

    if (!findOrder) {
      res.status(400).json({ error: "This order dos not exist." });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const deletedOrder = await orders.destroy({
          where: { id: findOrder.id },
          transaction: t
        });

        if (deletedOrder) {
          await addresses.destroy({
            where: {
              addressable_type: "orders",
              [Sequelize.Op.and]: { addressable_id: findOrder.id }
            },
            transaction: t
          });
        }
      });

      return res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this order." });
      console.log(err);
      return;
    }
  },

  async update(req, res) {
    const { id } = req.params;

    try {
      const response = await sequelize.transaction(async t => {
        const findOrder = await orders.findByPk(id, { transaction: t });

        if (!findOrder) {
          res.status(400).json({ error: "This order dos not exist." });
          return;
        }

        const [lines, updatedOrder] = await orders.update(req.body, {
          where: { id: findOrder.id },
          returning: true,
          transaction: t
        });

        return updatedOrder;
      });

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "Unable to update this order." });
      console.log(err);
      return;
    }
  }
};
