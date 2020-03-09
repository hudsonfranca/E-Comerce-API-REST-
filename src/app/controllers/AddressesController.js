const { customers, users } = require("../models");
const { addresses } = require("../models");
const sequelize = require("../models").sequelize;

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const findCustomer = await customers.findByPk(user_id);

    if (!findCustomer) {
      res.status(400).json({ error: "This customer not exists" });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const findAddresses = await findCustomer.getAddresses({
          transaction: t,
          attributes: [
            "id",
            "street_address",
            "city",
            "zip",
            "country",
            "state",
            "id_customers"
          ]
        });

        return findAddresses;
      });

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "Unable to display a list of addresses." });
      console.log(err);
      return;
    }
  },
  async store(req, res) {
    const { user_id } = req.params;
    const { street_address, city, zip, country, state } = req.body;

    const findUserByPk = await users.findByPk(user_id);

    if (!findUserByPk) {
      res.status(400).json({ error: "This user not exists" });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const addressCreated = await addresses.create(
          {
            street_address,
            city,
            zip,
            country,
            state,
            id_user: findUserByPk.id
          },
          { transaction: t }
        );

        return addressCreated;
      });

      res.status(201).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to register this address." });
      console.log(err);
      return;
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    const findAddress = await addresses.findByPk(id);

    if (!findAddress) {
      res.status(400).json({ error: "This address not exists" });
      return;
    }

    try {
      await sequelize.transaction(async t => {
        await addresses.destroy({
          where: { id: findAddress.id },
          transaction: t
        });
      });

      res.status(200).send();
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this address." });
      console.log(err);
      return;
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const findAddress = await addresses.findByPk(id);

    if (!findAddress) {
      res.status(400).json({ error: "This Address not exists" });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const [lines, updatedAddress] = await addresses.update(req.body, {
          where: { id },
          returning: true,
          transaction: t
        });

        return updatedAddress;
      });

      res.status(200).json(response);

      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to update this address." });
      console.log(err);
      return;
    }
  }
};
