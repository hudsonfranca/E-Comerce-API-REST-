const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define(
    "customers",
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

  customers.associate = function(models) {
    customers.hasMany(models.addresses, {
      foreignKey: "id_customers",
      as: "Addresses"
    });

    customers.hasMany(models.sales_historys, {
      foreignKey: "id_customers",
      as: "SalesHistorys"
    });

    customers.hasOne(models.carts, { foreignKey: "id_customers", as: "carts" });

    customers.hasOne(models.favorites, {
      foreignKey: "id_customers",
      as: "favorites"
    });
  };

  customers.prototype.checkPassword = function(checkPassword) {
    return bcrypt.compare(checkPassword, this.password);
  };

  customers.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET, {
      expiresIn: 86400
    });
  };

  return customers;
};
