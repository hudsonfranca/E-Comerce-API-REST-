const { orders } = require("../models");
const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;

module.exports = {
  async show(req, res) {
    const { name } = req.params;
    try {
      const response = await sequelize.transaction(async t => {
        const allOrders = await orders.findAndCountAll(
          {
            where: {
              status: {
                [Sequelize.Op.like]: `${name}%`
              }
            },
            attributes: [
              "id",
              "id_customers",
              "id_payment_methods",
              "status",
              "amount",
              "created_at"
            ],
            include: [
              {
                association: "Products",
                attributes: ["id", "name", "description", "price", "status"],
                through: {
                  attributes: ["quantity"]
                }
              },
              {
                association: "OrdersAddresse",
                attributes: [
                  "id",
                  "street_address",
                  "city",
                  "zip",
                  "country",
                  "state"
                ]
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
                      "email_address"
                    ]
                  }
                ]
              }
            ],
            distinct: true
          },
          { transaction: t }
        );
        return allOrders;
      });

      res.status(200).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to return cart " + err });
      console.log(err);
      return;
    }
  }
};
