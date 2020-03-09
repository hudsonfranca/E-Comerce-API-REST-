const { customers, users } = require("../models");

module.exports = {
  async store(req, res) {
    const { email_address, password } = req.body;

    const findCustomers = await users.findOne({ where: { email_address } });

    if (!findCustomers) {
      return res.status(401).json({ message: "Customer not found" });
    }

    if (!(await findCustomers.checkPassword(password))) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    findCustomers.password = undefined;

    return res.json({
      customer: findCustomers,
      access_token: findCustomers.generateToken()
    });
  }
};
