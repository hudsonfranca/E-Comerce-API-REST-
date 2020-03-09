"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: true,
          len: [1, 50],
          notEmpty: true
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: [1, 50],
          notEmpty: true
        }
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [1, 500]
        }
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [11, 11]
        }
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [1, 20]
        }
      }
    },
    {
      hooks: {
        beforeSave: async customer => {
          const hash = await bcrypt.hash(customer.password, 16);
          customer.password = hash;
        }
      }
    }
  );
  users.associate = function(models) {
    users.hasOne(models.customers, { foreignKey: "id", as: "Customer" });
    users.hasOne(models.admins, { foreignKey: "id", as: "Admin" });
    users.hasOne(models.addresses, {
      foreignKey: "addressable_id",
      as: "Addresses",
      constraints: false,
      scope: {
        addressable_type: "users"
      }
    });
  };

  users.prototype.checkPassword = function(checkPassword) {
    return bcrypt.compare(checkPassword, this.password);
  };

  users.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET, {
      expiresIn: 86400
    });
  };

  return users;
};
