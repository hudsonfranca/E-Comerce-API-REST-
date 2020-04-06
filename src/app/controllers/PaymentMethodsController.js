const { payment_methods } = require("../models");
const sequelize = require("../models").sequelize;

module.exports = {
  async index(req, res) {
    try {
      const response = await sequelize.transaction(async (t) => {
        const allPaymentMethods = await payment_methods.findAll({
          transaction: t,
        });

        return allPaymentMethods;
      });

      return res.status(200).json(response);
    } catch (err) {
      console.log(err);

      return res
        .status(400)
        .json({ error: "Unable to return all payment methods ." });
    }
  },

  async show(req, res) {
    const { id } = req.params;
    try {
      const response = await sequelize.transaction(async (t) => {
        const PaymentMethods = await payment_methods.findByPk(id, {
          transaction: t,
        });

        return PaymentMethods;
      });

      return res.status(200).json(response);
    } catch (err) {
      console.log(err);

      return res
        .status(400)
        .json({ error: "Unable to return all payment methods ." });
    }
  },

  async store(req, res) {
    const { name, status } = req.body;

    try {
      const response = await sequelize.transaction(async (t) => {
        const [paymentMethodsCreated] = await payment_methods.findOrCreate({
          where: { name },
          defaults: { status: true },
          transaction: t,
        });

        return paymentMethodsCreated;
      });

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "Unable to create this payment method." });
      console.log(err);
      return;
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const findpaymentMethods = await payment_methods.findByPk(id);

    if (!findpaymentMethods) {
      return res
        .status(400)
        .json({ error: "This payment Method dos not exist." });
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        await payment_methods.destroy({
          where: { id: findpaymentMethods.id },
          transaction: t,
        });
      });

      return res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: "Unable to delete this payment method." });
      console.log(err);
      return;
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const findpaymentMethods = await payment_methods.findByPk(id);

    if (!findpaymentMethods) {
      res.status(400).json({ error: "This payment Method dos not exist." });
      return;
    }

    try {
      const response = await sequelize.transaction(async (t) => {
        const [lines, updatedPaymentMethods] = await payment_methods.update(
          req.body,
          {
            where: { id: findpaymentMethods.id },
            returning: true,
            transaction: t,
          }
        );

        return updatedPaymentMethods;
      });

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: "Unable to update this payment method." });
      console.log(err);
      return;
    }
  },
};
