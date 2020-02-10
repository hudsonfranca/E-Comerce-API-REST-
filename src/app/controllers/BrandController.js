const { brands } = require("../models");
const sequelize = require("../models").sequelize;

module.exports = {
  async index(req, res) {
    try {
      const response = await sequelize.transaction(async t => {
        const allBrands = await brands.findAll({
          attributes: ["id", "name"],
          transaction: t
        });

        return allBrands;
      });

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "Unable to display all brands." });
      console.log(err);
      return;
    }
  },
  async store(req, res) {
    const { name } = req.body;

    try {
      const response = await sequelize.transaction(async t => {
        const [brandCreated] = await brands.findOrCreate({
          attributes: ["name"],
          where: { name },
          transaction: t
        });

        return brandCreated;
      });

      res.status(201).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to register this brand." });
      console.log(err);
      return;
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    const findBrand = await brands.findByPk(id);

    if (!findBrand) {
      res.status(400).json({ error: "This brand not exists" });
      return;
    }

    try {
      await sequelize.transaction(async t => {
        await brands.destroy({
          where: { id: findBrand.id },
          transaction: t
        });
      });

      res.status(200).send();
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this brand." });
      console.log(err);
      return;
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const findBrand = await brands.findByPk(id);

    if (!findBrand) {
      res.status(400).json({ error: "This brand not exists" });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const [lines, updatedBrand] = await brands.update(req.body, {
          where: { id },
          returning: true,
          transaction: t
        });

        return updatedBrand;
      });

      res.status(200).json(response);

      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to update this address." });
      console.log(err);
      return;
    }
  }
};
