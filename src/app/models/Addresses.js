module.exports = (sequelize, DataTypes) => {
  const addresses = sequelize.define(
    "addresses",
    {
      street_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: [1, 150],
          notEmpty: true
        }
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: true,
          len: [1, 100],
          notEmpty: true
        }
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: true,
          len: [1, 10],
          notEmpty: true
        }
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: true,
          len: [1, 40],
          notEmpty: true
        }
      },
      addressable_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      addressable_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: true,
          len: [1, 40],
          notEmpty: true
        }
      }
    },
    {
      hooks: {
        afterFind: async findResult => {
          if (!Array.isArray(findResult)) findResult = [findResult];
          for (const instance of findResult) {
            if (
              instance.addressable_type === "orders" &&
              instance.orders !== undefined
            ) {
              instance.addressable = instance.orders;
            } else if (
              instance.addressable_type === "users" &&
              instance.users !== undefined
            ) {
              instance.addressable = instance.users;
            }
            // To prevent mistakes:
            delete instance.orders;
            delete instance.dataValues.orders;
            delete instance.users;
            delete instance.dataValues.users;
          }
        }
      }
    }
  );

  addresses.associate = function(models) {
    addresses.belongsTo(models.users, {
      foreignKey: "addressable_id",
      as: "User",
      constraints: false
    });
    addresses.belongsTo(models.orders, {
      foreignKey: "addressable_id",
      as: "Orders",
      constraints: false
    });
  };

  const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

  addresses.prototype.getAddressable = function(options) {
    if (!this.addressable_type) return Promise.resolve(null);
    const mixinMethodName = `get${uppercaseFirst(this.addressable_type)}`;
    return this[mixinMethodName](options);
  };

  return addresses;
};
