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
            attributes: ["id", "status"],
            include: [
              {
                association: "Sale",
                attributes: [
                  "id",
                  "id_customers",
                  "id_payment_methods",
                  "amount",
                  "created_at"
                ],
                include: [
                  {
                    association: "Products",
                    attributes: ["id", "name", "brand_id", "description"],
                    through: { attributes: [] }
                  },
                  {
                    association: "Customers",
                    attributes: [
                      "id",
                      "first_name",
                      "last_name",
                      "email_address"
                    ],
                    include: [
                      {
                        association: "Addresses",
                        attributes: [
                          "id",
                          "street_address",
                          "city",
                          "zip",
                          "country",
                          "state"
                        ]
                      }
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
