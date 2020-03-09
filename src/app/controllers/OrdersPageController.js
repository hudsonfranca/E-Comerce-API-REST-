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
      const response = await sequelize.transaction(async t => {
        const allOrders = await orders.findAll(
          {
            where: { id_customer: req.userId },
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
                    include: {
                      association: "Images",
                      attributes: ["url"]
                    },
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
            ]
          },
          { transaction: t }
        );
        console.log(allOrders);
        return allOrders;
      });

      res.status(200).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to return order " + err });
      console.log(err);
      return;
    }
  }
};
