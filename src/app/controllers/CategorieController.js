const { categories } = require("../models");
const sequelize = require("../models").sequelize;

module.exports = {
  async index(req, res) {
    try {
      const response = await sequelize.transaction(async (t) => {
        const allCategories = await categories.findAll({
          attributes: ["id", "name"],
          transaction: t,
        });

        return allCategories;
      });

      res.status(200).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to display all categories." });
      console.log(err);
      return;
    }
  },
  async show(req, res) {
    const { id } = req.params;
    try {
      const response = await sequelize.transaction(async (t) => {
        const Categorie = await categories.findByPk(id, {
          attributes: ["id", "name"],
          transaction: t,
        });

        return Categorie;
      });

      res.status(200).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to display this categorie." });
      console.log(err);
      return;
    }
  },
  async store(req, res) {
    const { name } = req.body;

    try {
      const response = await sequelize.transaction(async (t) => {
        const [categorieCreated] = await categories.findOrCreate({
          attributes: ["name"],
          where: { name },
          transaction: t,
        });

        return categorieCreated;
      });

      res.status(201).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to register this categorie." });
      console.log(err);
      return;
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    const findcategorie = await categories.findByPk(id);

    if (!findcategorie) {
      res.status(400).json({ error: "This categorie not exists" });
      return;
    }

    try {
      await sequelize.transaction(async (t) => {
        await categories.destroy({
          where: { id },
          transaction: t,
        });
      });

      res.status(200).send();
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this categorie." });
      console.log(err);
      return;
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const findCategorie = await categories.findByPk(id);

    if (!findCategorie) {
      res.status(400).json({ error: "This categorie not exists" });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const [lines, updatedCategorie] = await categories.update(req.body, {
          where: { id },
          returning: true,
          transaction: t,
        });

        return updatedCategorie;
      });

      res.status(200).json(response);

      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to update this categorie." });
      console.log(err);
      return;
    }
  },
};
