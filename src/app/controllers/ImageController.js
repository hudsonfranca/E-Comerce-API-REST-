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
            attributes: ["id", "id_product", "image", "aspect_ratio"]
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
    const file = req.file;

    const { aspect_ratio } = req.params;

    const findProduct = await products.findByPk(req.params.id);

    if (!findProduct) {
      res.status(400).json({ error: "This product not exists" });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const imageCreated = await images.create(
          {
            image: file.filename,
            id_product: findProduct.id,
            aspect_ratio
          },
          { transaction: t }
        );

        return imageCreated;
      });

      res.status(201).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to register this image." });
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

    const image = `${path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      `${path.basename(findImages.image)}`
    )}`;

    try {
      await sequelize.transaction(async t => {
        await images
          .destroy({
            where: { id: findImages.id },
            transaction: t
          })
          .then(async () => {
            await fs.unlinkSync(image);
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
