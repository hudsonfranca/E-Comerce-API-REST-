const { stock } = require("../models");
const { products, images } = require("../models");
const sequelize = require("../models").sequelize;

module.exports = {
  async store(req, res) {
    const file = req.file;

    const findProduct = await products.findByPk(req.params.id);

    if (!findProduct) {
      res.status(400).json({ error: "This product not exists" });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const imageCreated = await images.create(
          {
            url: file.filename,
            id_product: findProduct.id
          },
          { transaction: t }
        );

        return imageCreated;
      });

      res.status(201).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to register this product." });
      console.log(err);
      return;
    }
  }
};
