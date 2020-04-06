const { carts, cart_products, products, customers } = require("../models");

const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;

module.exports = {
  async index(req, res) {
    const findCustomer = await customers.findByPk(req.userId);

    if (!findCustomer) {
      res.status(401).json({ error: "Sign in or create an account." });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const findCart = await carts.findOne({
          attributes: [],
          where: { id_customers: findCustomer.id },
          transaction: t,
          include: {
            association: "Products",
            attributes: ["id", "name", "description", "price", "status"],

            include: {
              association: "Images",
              attributes: ["id", "id_product", "image", "aspect_ratio"],
              distinct: true,
            },
            through: {
              attributes: ["quantity"],
            },
          },
        });

        if (!findCart) {
          return res.status(400).json({ error: "Your cart is empty" });
        }

        return findCart;
      });
      res.status(200).json(response.Products);
      return;
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Unable to return cart " + err });
      return;
    }
  },
  async store(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;

    const findProduct = await products.findByPk(id);

    if (!findProduct) {
      res.status(400).json({ error: "This product does not exist." });
      return;
    }

    const findCustomer = await customers.findByPk(req.userId);

    if (!findCustomer) {
      res.status(400).json({ error: "Sign in or create an account." });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const [cartCreated] = await carts.findOrCreate({
          where: { id_customers: findCustomer.id },
          transaction: t,
        });

        await cart_products.create(
          {
            id_cart: cartCreated.id,
            id_product: findProduct.id,
            quantity,
          },
          { transaction: t }
        );

        return cartCreated;
      });

      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Unable to add this product to cart." });
      return;
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    const findProduct = await products.findByPk(id);

    if (!findProduct) {
      return res.status(400).json({ error: "This product does not exist." });
    }

    const findCart = await carts.findOne({
      where: { id_customers: req.userId },
    });

    if (!findCart) {
      return res.status(400).json({ error: "This cart does not exist." });
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        await findCart.removeProducts(findProduct, { transaction: t });
      });

      return res.status(200).json();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Unable to delete this product." });
    }
  },
  async update(req, res) {
    const { id } = req.params;

    const findProduct = await products.findByPk(id);

    if (!findProduct) {
      return res.status(400).json({ error: "This product does not exist." });
    }

    const findCart = await carts.findOne({
      where: { id_customers: req.userId },
    });

    if (!findCart) {
      return res.status(400).json({ error: "This cart does not exist." });
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const [lines, updatedCartProducts] = await cart_products.update(
          req.body,
          {
            where: {
              id_cart: findCart.id,
              [Sequelize.Op.and]: { id_product: findProduct.id },
            },
            returning: true,
            transaction: t,
          }
        );

        return updatedCartProducts;
      });

      res.status(200).json(response);

      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to update this cart." });
      console.log(err);
      return;
    }
  },
};
