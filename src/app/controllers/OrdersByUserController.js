const { orders } = require("../models");
const { customers } = require("../models");
const sequelize = require("../models").sequelize;

module.exports = {
  async show(req, res) {
    const findCustomer = await customers.findByPk(req.userId);

    if (!findCustomer) {
      res.status(401).json({ error: "Sign in or create an account." });
      return;
    }
    try {
      const response = await sequelize.transaction(async (t) => {
        const allOrders = await orders.findAll(
          {
            where: { id_customers: req.userId },
            attributes: [
              "id",
              "id_customers",
              "id_payment_methods",
              "status",
              "amount",
              "created_at",
            ],
            include: [
              {
                association: "Products",
                attributes: ["id", "name", "description", "price", "status"],
                include: [
                  {
                    association: "Images",
                    attributes: ["id", "id_product", "image", "aspect_ratio"],
                  },
                ],
                through: {
                  attributes: ["quantity"],
                },
              },
              {
                association: "OrdersAddresse",
                attributes: [
                  "id",
                  "street_address",
                  "city",
                  "zip",
                  "country",
                  "state",
                ],
              },
              {
                association: "Customers",
                attributes: ["id"],
                include: [
                  {
                    association: "User",
                    attributes: [
                      "id",
                      "first_name",
                      "last_name",
                      "email_address",
                    ],
                  },
                ],
              },
            ],
          },
          { transaction: t }
        );
        return allOrders;
      });

      res.status(200).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to return order " + err });
      console.log(err);
      return;
    }
  },
};
