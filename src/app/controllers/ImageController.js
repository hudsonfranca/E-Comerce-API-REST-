const { products, images } = require("../models");
const sequelize = require("../models").sequelize;
const path = require("path");
const fs = require("fs");

module.exports = {
  async show(req, res) {
    const { id } = req.params;
    const response = await sequelize.transaction(async t => {
      try {
        const imagesByProduct = await images.findAll(
          {
            where: {
              id_product: id
            },
            attributes: ["id", "url"]
          },
          { transaction: t }
        );

        return imagesByProduct;
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err: "error" });
      }
    });
    return res.status(200).json(response);
  },
  async store(req, res) {
    const { name, brand_id, description, price, status } = req.body;

    const findBrand = await brands.findByPk(brand_id);
    const findCategorie = await categories.findByPk(req.params.categorie_id);

    if (!findBrand) {
      res.status(400).json({ error: "This brand not exists" });
      return;
    } else if (!findCategorie) {
      res.status(400).json({ error: "This categorie not exists" });
      return;
    } else if (price < 0) {
      return res.status(400).json({ error: "Price cannot be negative" });
    }

    try {
      const response = await sequelize.transaction(async t => {
        const productCreated = await products.create(
          {
            name,
            brand_id,
            description,
            price,
            status
          },
          { transaction: t }
        );

        await productCreated.addCategories(findCategorie, { transaction: t });

        return productCreated;
      });

      res.status(201).json(response.id);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to register this product." });
      console.log(err);
      return;
    }
  },
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
  },
  async delete(req, res) {
    const { id } = req.params;

    const findImages = await images.findByPk(id);

    if (!findImages) {
      res.status(400).json({ error: "This image not exists" });
      return;
    }

    const imagePath = `${path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      `${path.basename(findImages.url)}`
    )}`;

    try {
      await sequelize.transaction(async t => {
        await images
          .destroy({
            where: { id: findImages.id },
            transaction: t
          })
          .then(async () => {
            await fs.unlinkSync(imagePath);
          });
      });

      res.status(200).send();
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this image." });
      console.log(err);
      return;
    }
  }
};
