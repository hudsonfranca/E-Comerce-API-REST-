const { customers, users, addresses } = require("../models");
const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    const { offset, limit } = req.query;
    const response = await sequelize.transaction(async (t) => {
      try {
        const findAllCustomer = await customers.findAndCountAll({
          offset,
          limit,
          attributes: ["id"],
          distinct: true,
          include: [
            {
              association: "User",
              attributes: [
                "first_name",
                "last_name",
                "email_address",
                "cpf",
                "phone_number",
                "createdAt",
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
                    "state",
                  ],
                },
              ],
            },
          ],

          transaction: t,
        });

        return findAllCustomer;
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err: "error" });
      }
    });
    return res.status(200).json(response);
  },
  async show(req, res) {
    const { id } = req.params;
    const response = await sequelize.transaction(async (t) => {
      try {
        const findCustomer = await customers.findByPk(id, {
          attributes: ["id"],
          include: [
            {
              association: "User",
              attributes: [
                "first_name",
                "last_name",
                "email_address",
                "cpf",
                "phone_number",
                "createdAt",
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
                    "state",
                  ],
                },
              ],
            },
          ],

          transaction: t,
        });

        return findCustomer;
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err: "error" });
      }
    });
    return res.status(200).json(response);
  },

  async store(req, res) {
    const {
      first_name,
      last_name,
      email_address,
      cpf,
      phone_number,
      password,
      customerAddress,
    } = req.body;

    const findEmail = await users.findOne({
      where: { email_address },
    });

    if (findEmail) {
      res.status(400).json({ error: "Choose another email." });
      return;
    }

    const customerCpf = await users.findOne({
      where: { cpf },
    });

    if (customerCpf) {
      res.status(400).json({ error: "Choose another cpf." });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const createdUser = await users.create(
          {
            first_name,
            last_name,
            email_address,
            cpf,
            phone_number,
            password,
          },
          { transaction: t }
        );

        if (createdUser) {
          await customers.create(
            {
              id: createdUser.id,
            },
            { transaction: t }
          );

          createdUser.password = undefined;

          await createdUser.createAddresses(customerAddress, {
            transaction: t,
          });

          return {
            user: createdUser,
            access_token: createdUser.generateToken(),
          };
        }
      });

      return res.status(201).json(response);
    } catch (err) {
      return res.status(400).json({ err: err });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const findCustomer = await users.findByPk(id);

    if (!findCustomer) {
      res.status(400).json({ error: "This cutomer does not exist" });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const deletedUser = await users.destroy({
          where: { id: findCustomer.id },
          transaction: t,
        });

        if (deletedUser) {
          await addresses.destroy({
            where: {
              addressable_type: "users",
              [Sequelize.Op.and]: { addressable_id: findCustomer.id },
            },
            transaction: t,
          });
        }
      });

      res.status(200).send();
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this customer." });
      console.log(err);
      return;
    }

    return res.status(200).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    const { email_address, cpf } = req.body;

    const findEmail = await users.findOne({
      where: { email_address, id: { [Sequelize.Op.ne]: id } },
    });

    if (findEmail) {
      res.status(400).json({ error: "Choose another email." });
      return;
    }

    const customerCpf = await users.findOne({
      where: { cpf, id: { [Sequelize.Op.ne]: id } },
    });

    if (customerCpf) {
      res.status(400).json({ error: "Choose another cpf." });
      return;
    }

    async function hashPassword() {
      let data = req.body;

      const hash = await bcrypt.hash(req.body.password, 16);

      data.password = hash;

      return data;
    }

    const dataWithHashPassword = await hashPassword();

    const findCustomer = await users.findByPk(id);

    if (!findCustomer) {
      res.status(400).json({ error: "This customer does not exist" });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const [lines, updatedCustomer] = await users.update(
          dataWithHashPassword,
          {
            where: { id },
            returning: true,
            transaction: t,
          }
        );

        updatedCustomer[0].password = undefined;

        if (updatedCustomer) {
          const [lines, updatedAddress] = await addresses.update(data, {
            where: {
              addressable_type: "users",
              [Sequelize.Op.and]: { addressable_id: updatedCustomer[0].id },
            },
            returning: true,
            transaction: t,
          });
        }
        return updatedCustomer;
      });

      res.status(200).json(response);

      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to update this customer." });
      console.log(err);
      return;
    }
  },
};
