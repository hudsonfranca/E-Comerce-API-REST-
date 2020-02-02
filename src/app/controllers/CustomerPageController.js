const { customers, addresses } = require("../models");
const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;
const bcrypt = require("bcrypt");

module.exports = {
  async show(req, res) {
    const { id } = req.params;
    const response = await sequelize.transaction(async t => {
      try {
        const findAllCustomer = await customers.findByPk(id, {
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email_address",
            "cpf",
            "phone_number"
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
          ],
          transaction: t
        });

        return findAllCustomer;
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err: "error" });
      }
    });
    return res.status(200).json(response);
  },

  async update(req, res) {
    const { id_customer } = req.params;
    const { id_addresses } = req.params;

    const findCustomer = await customers.findByPk(id_customer);

    if (!findCustomer) {
      res.status(400).json({ error: "This customer does not exist" });
      return;
    }

    const findAddresses = await addresses.findByPk(id_addresses);

    if (!findAddresses) {
      res.status(400).json({ error: "This addresses does not exist" });
      return;
    }

    const {
      first_name,
      last_name,
      email_address,
      cpf,
      phone_number,
      street_address,
      city,
      zip,
      country,
      state,
      password
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 16);

    try {
      const response = await sequelize.transaction(async t => {
        const [lines, updatedCustomer] = await customers.update(
          {
            first_name,
            last_name,
            email_address,
            cpf,
            phone_number,
            password: hashPassword
          },
          {
            where: { id: id_customer },
            returning: true,
            transaction: t
          }
        );

        let addressesData = {};

        if (updatedCustomer) {
          const [lines, updateAddresses] = await addresses.update(
            { street_address, city, zip, country, state },
            {
              where: { id: id_addresses },
              returning: true,
              transaction: t
            }
          );

          addressesData = updateAddresses;
        }

        return { updatedCustomer, addressesData };
      });

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "Unable to update this customer." });
      console.log(err);
      return;
    }
  }
};
