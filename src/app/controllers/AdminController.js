const { admins, users } = require("../models");
const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    const response = await sequelize.transaction(async t => {
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
                "createdAt"
              ],
              include: [
                {
                  association: "Addresses",
                  attributes: [
                    "street_address",
                    "city",
                    "zip",
                    "country",
                    "state"
                  ]
                }
              ]
            }
          ],

          transaction: t
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
    const { name } = req.query;
    const response = await sequelize.transaction(async t => {
      try {
        const findAllAdmins = await users.findAll({
          where: sequelize.where(
            sequelize.fn(
              "concat",
              sequelize.col("first_name"),
              " ",
              sequelize.col("last_name")
            ),
            {
              [Sequelize.Op.iLike]: `%${name}%`
            }
          ),
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email_address",
            "cpf",
            "phone_number",
            "createdAt"
          ],
          include: [
            {
              association: "Addresses",
              attributes: ["street_address", "city", "zip", "country", "state"]
            },
            {
              association: "Admin",
              attributes: ["type"]
            }
          ],
          transaction: t
        });

        return findAllAdmins;
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
      type
    } = req.body;

    const findEmail = await users.findOne({
      where: { email_address }
    });

    if (findEmail) {
      res.status(400).json({ error: "Choose another email." });
      return;
    }

    const adminCpf = await users.findOne({
      where: { cpf }
    });

    if (adminCpf) {
      res.status(400).json({ error: "Choose another cpf." });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const createdAdmin = await users.create(
          {
            first_name,
            last_name,
            email_address,
            cpf,
            phone_number,
            password
          },
          { transaction: t }
        );

        await admins.create(
          {
            id: createdAdmin.id,
            type
          },
          { transaction: t }
        );

        createdAdmin.password = undefined;

        return {
          name: `${createdAdmin.first_name} ${createdAdmin.last_name}`,
          access_token: createdAdmin.generateToken()
        };
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
      const response = await sequelize.transaction(async t => {
        await users.destroy({
          where: { id: findAdmin.id },
          transaction: t
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

    async function hashPassword() {
      let data = req.body;

      const hash = await bcrypt.hash(req.body.password, 16);

      data.password = hash;

      return data;
    }

    const dataWithHashPassword = await hashPassword();

    const findAdmin = await users.findByPk(id);

    if (!findAdmin) {
      res.status(400).json({ error: "This customer does not exist" });
      return;
    }

    try {
      const response = await sequelize.transaction(async t => {
        const [lines, updatedUser] = await users.update(dataWithHashPassword, {
          where: { id },
          returning: true,
          transaction: t
        });

        const [linesAdmin, updatedAdmin] = await admins.update(
          dataWithHashPassword,
          {
            where: { id },
            returning: true,
            transaction: t
          }
        );

        return updatedUser;
      });

      res.status(200).json(response);

      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to update this admin." });
      console.log(err);
      return;
    }
  }
};
