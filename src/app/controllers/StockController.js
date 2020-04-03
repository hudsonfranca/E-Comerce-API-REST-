const { stock, products } = require("../models");

const sequelize = require("../models").sequelize;

module.exports = {
  async show(req, res) {
    const { id } = req.params;

    try {
      const response = await sequelize.transaction(async t => {
        const findStock = await products.findOne(
          {
            where: { id },
            attributes: ["name"],
            include: [
              {
                association: "Stock",
                attributes: ["id", "quantity", "id_product"]
              }
            ]
          },
          { transaction: t }
        );

        return findStock;
      });

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "Unable to return this stock" });
      console.log(err);
      return;
    }
  },
  async index(req, res) {
    const { offset, limit } = req.params;
    try {
      const response = await sequelize.transaction(async t => {
        const allstock = await products.findAndCountAll(
          {
            offset,
            limit,
            distinct: true,
            attributes: ["name"],
            include: [
              {
                association: "Stock",
                attributes: ["id", "quantity", "id_product"]
              }
            ]
          },
          { transaction: t }
        );

        return allstock;
      });

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "Unable to return stock" });
      console.log(err);
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

    try {
      const response = await sequelize.transaction(async t => {
        const [stockCreated] = await stock.findOrCreate({
          where: { id_product: findProduct.id },
          defaults: { quantity },
          transaction: t
        });

        if (stockCreated) {
          await products.update(
            { status: true },
            {
              where: { id: findProduct.id },
              transaction: t
            }
          );
        }

        return stockCreated;
      });

      res.status(201).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to register this stock." });
      console.log(err);
      return;
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    const findStock = await stock.findByPk(id);

    if (!findStock) {
      res.status(400).json({ error: "This stock does not exist." });
      return;
    }

    try {
      await sequelize.transaction(async t => {
        await stock.destroy({
          where: { id },
          transaction: t
        });
      });

      res.status(200).send();
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this stock." });
      console.log(err);
      return;
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const findStock = await stock.findByPk(id);

    if (!findStock) {
      res.status(400).json({ error: "This stock does not exist." });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const [lines, updatedStock] = await stock.update(req.body, {
          where: { id: findStock.id },
          returning: true,
          transaction: t
        });

        return updatedStock;
      });

      res.status(200).json(response);

      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to update this stock." });
      console.log(err);
      return;
    }
  }
};
