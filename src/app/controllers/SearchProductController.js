const { products } = require("../models");

const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;

module.exports = {
  async index(req, res) {
    const { name, offset, limit } = req.query;
    try {
      const response = await sequelize.transaction(async t => {
        const allProducts = await products.findAndCountAll(
          {
            offset,
            limit,
            where: {
              name: {
                [Sequelize.Op.iLike]: `%${name}%`
              }
            },

            attributes: ["id", "name", "description", "price", "status"],
            include: [
              {
                association: "Images",
                attributes: ["id", "id_product", "image", "aspect_ratio"]
              },
              {
                association: "Brand",
                attributes: ["id", "name"]
              },

              {
                association: "Categories",
                attributes: ["id", "name"],
                through: { attributes: [] }
              }
            ],
            distinct: true
          },
          { transaction: t }
        );
        console.log(allProducts.rows);
        return allProducts;
      });

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "unable to return products." });
      console.log(err);
      return;
    }
  }
};
