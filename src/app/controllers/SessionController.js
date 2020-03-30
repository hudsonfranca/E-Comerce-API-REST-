const { customers, users } = require("../models");

module.exports = {
  async store(req, res) {
    const { email_address, password } = req.body;

    const findUser = await users.findOne({ where: { email_address } });

    if (!findUser) {
      return res.status(401).json({ message: "Customer not found" });
    }

    if (!(await findUser.checkPassword(password))) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    findUser.password = undefined;

    return res.json({
      user: findUser,
      access_token: findUser.generateToken()
    });
  }
};
