const { customers } = require("../models");

module.exports = {
  async store(req, res) {
    const { email_address, password } = req.body;

    const findCustomers = await customers.findOne({ where: { email_address } });

    if (!findCustomers) {
      return res.status(401).json({ message: "Customer not found" });
    }

    if (!(await findCustomers.checkPassword(password))) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    findCustomers.password = undefined;

    return res.json({
      name: `${findCustomers.first_name} ${findCustomers.last_name}`,
      access_token: findCustomers.generateToken()
    });
  }
};
