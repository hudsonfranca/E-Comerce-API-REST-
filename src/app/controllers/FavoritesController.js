const { products } = require("../models");
const { customers } = require("../models");
const { favorites } = require("../models");
const sequelize = require("../models").sequelize;

module.exports = {
  async index(req, res) {
    const findCustomer = await customers.findByPk(req.userId);

    if (!findCustomer) {
      res.status(401).json({ error: "Sign in or create an account." });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const findFavorites = await favorites.findOne({
          attributes: [],
          where: { id_customers: findCustomer.id },
          transaction: t,
          include: {
            association: "Products",
            attributes: ["id", "name", "description", "price", "status"],
            include: {
              association: "Images",
              attributes: ["url"]
            },
            through: {
              attributes: []
            }
          }
        });

        if (!findFavorites) {
          res.status(400).json({ error: "Your favorites list is empty" });
          return;
        }

        return findFavorites;
      });

      res.status(200).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to return favorites list " + err });
      console.log(err);
      return;
    }
  },
  async store(req, res) {
    const { id } = req.params;

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
      const response = await sequelize.transaction(async t => {
        const [favoritesCreated] = await favorites.findOrCreate({
          where: { id_customers: findCustomer.id },
          transaction: t
        });

        await favoritesCreated.addProducts(findProduct, { transaction: t });

        return favoritesCreated;
      });

      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ error: "Unable to add this product to favorites." });
      return;
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    const findProduct = await products.findByPk(id);

    if (!findProduct) {
      return res.status(400).json({ error: "This product does not exist." });
    }

    const findFavorites = await favorites.findOne({
      where: { id_customers: req.userId }
    });

    if (!findFavorites) {
      return res.status(400).json({ error: "Unable to delete this product." });
    }

    try {
      const response = await sequelize.transaction(async t => {
        await findFavorites.removeProducts(findProduct, { transaction: t });
      });

      return res.status(200).json();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Unable to delete this product." });
    }
  }
};
