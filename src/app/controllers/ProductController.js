const { products } = require("../models");
const { brands } = require("../models");
const { categories } = require("../models");
const { images } = require("../models");
const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;
const fs = require("fs");
const path = require("path");

module.exports = {
  async index(req, res) {
    try {
      const response = await sequelize.transaction(async t => {
        const allProducts = await products.findAll(
          {
            attributes: ["id", "name", "description", "price", "status"],
            include: [
              {
                association: "Images",
                attributes: [
                  "id",
                  "id_product",
                  "image",
                  "small",
                  "aspect_ratio"
                ]
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
            ]
          },
          { transaction: t }
        );

        return allProducts;
      });

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "unable to return products." });
      console.log(err);
      return;
    }
  },
  async show(req, res) {
    const { id } = req.params;

    try {
      const response = await sequelize.transaction(async t => {
        const product = await products.findByPk(
          id,
          {
            attributes: ["id", "name", "description", "price", "status"],
            include: [
              {
                association: "Images",
                attributes: [
                  "id",
                  "id_product",
                  "image",
                  "small",
                  "aspect_ratio"
                ]
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
            ]
          },
          { transaction: t }
        );

        return product;
      });

      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err: "error" });
    }
  },
  async store(req, res) {
    const {
      name,
      brand_id,
      description,
      price,
      status,
      categorie_id
    } = req.body;

    const findBrand = await brands.findByPk(brand_id);
    const findCategorie = await categories.findByPk(categorie_id);

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
  async delete(req, res) {
    const { id } = req.params;

    const findProduct = await products.findByPk(id);

    if (!findProduct) {
      res.status(400).json({ error: "This product does not exist" });
      return;
    }

    const imagesPath = await images
      .findAll({
        where: { id_product: findProduct.id },
        attributes: ["url"]
      })
      .then(url => {
        const pathArr = url.reduce(function(prevVal, elem) {
          return [
            ...prevVal,
            {
              path: `${path.resolve(
                __dirname,
                "..",
                "..",
                "..",
                "uploads",
                `${path.basename(elem.url)}`
              )}`
            }
          ];
        }, []);
        return pathArr;
      });

    try {
      await sequelize.transaction(async t => {
        await products
          .destroy({
            where: { id: findProduct.id },
            transaction: t
          })
          .then(() => {
            imagesPath.map(async ({ path }) => {
              await fs.unlinkSync(path);
            });
          });
      });

      res.status(200).send();

      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this product." });
      console.log(err);
      return;
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const findProduct = await products.findByPk(id);

    const { name, description, price, status, brand_id, Categories } = req.body;

    const findCategorie = await categories.findByPk(Categories);

    if (!findCategorie) {
      res.status(400).json({ error: "This categorie not exists" });
      return;
    }

    if (!findProduct) {
      res.status(400).json({ error: "This product does not exist" });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const [lines, updatedProduct] = await products.update(
          { name, description, price, status, brand_id },
          {
            where: { id },
            returning: true,
            transaction: t
          }
        );

        if (updatedProduct) {
          await findProduct.setCategories([]).then(async () => {
            await findProduct.addCategories(findCategorie, {
              transaction: t
            });
          });
        }

        return updatedProduct;
      });

      res.status(200).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to update this product." });
      console.log(err);
      return;
    }
  }
};
