const { admins, users, addresses } = require("../models");
const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    const response = await sequelize.transaction(async (t) => {
      try {
        const findAllAdmins = await admins.findAll({
          attributes: ["id", "type"],
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

        return findAllAdmins;
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
        const findAdmins = await admins.findByPk(id, {
          attributes: ["id", "type"],
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

        return findAdmins;
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
      adminAddress,
      type,
    } = req.body;

    const findEmail = await users.findOne({
      where: { email_address },
    });

    if (findEmail) {
      res.status(400).json({ error: "Choose another email." });
      return;
    }

    const adminCpf = await users.findOne({
      where: { cpf },
    });

    if (adminCpf) {
      res.status(400).json({ error: "Choose another cpf." });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const createdAdmin = await users.create(
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

        if (createdAdmin) {
          await admins.create(
            {
              id: createdAdmin.id,
              type,
            },
            { transaction: t }
          );

          createdAdmin.password = undefined;

          await createdAdmin.createAddresses(adminAddress, { transaction: t });

          return {
            user: createdAdmin,
            access_token: createdAdmin.generateToken(),
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

    const findAdmin = await users.findByPk(id);

    if (!findAdmin) {
      res.status(400).json({ error: "This admin does not exist" });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        await users.destroy({
          where: { id: findAdmin.id },
          transaction: t,
        });
      });

      res.status(200).send();
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this admin." });
      console.log(err);
      return;
    }

    return res.status(200).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    async function hashPassword() {
      let data = req.body;

      const { email_address, cpf } = req.body;

      const findEmail = await users.findOne({
        where: { email_address, id: { [Sequelize.Op.ne]: id } },
      });

      if (findEmail) {
        return res.status(400).json({ error: "Choose another email." });
      }

      const customerCpf = await users.findOne({
        where: { cpf, id: { [Sequelize.Op.ne]: id } },
      });

      if (customerCpf) {
        return res.status(400).json({ error: "Choose another cpf." });
      }

      const hash = await bcrypt.hash(req.body.password, 16);

      data.password = hash;

      return data;
    }

    const dataWithHashPassword = await hashPassword();

    const findAdmin = await users.findByPk(id);

    if (!findAdmin) {
      res.status(400).json({ error: "This admin does not exist" });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const [lines, updatedUser] = await users.update(dataWithHashPassword, {
          where: { id },
          returning: true,
          transaction: t,
        });

        const [linesAdmin, updatedAdmin] = await admins.update(
          dataWithHashPassword,
          {
            where: { id },
            returning: true,
            transaction: t,
          }
        );

        updatedUser[0].password = undefined;

        if (updatedAdmin) {
          const [lines, updatedAddress] = await addresses.update(data, {
            where: {
              addressable_type: "users",
              [Sequelize.Op.and]: { addressable_id: updatedAdmin[0].id },
            },
            returning: true,
            transaction: t,
          });
        }

        return updatedUser;
      });

      res.status(200).json(response);

      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to update this admin." });
      console.log(err);
      return;
    }
  },
};
