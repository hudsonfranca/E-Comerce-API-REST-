module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define("orders", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });

  orders.associate = function(models) {
    orders.belongsToMany(models.products, {
      foreignKey: "id_orders",
      through: "orders_products",
      as: "Products"
    });

    orders.belongsTo(models.payment_methods, {
      foreignKey: "id_payment_methods",
      as: "payment_method"
    });

    orders.hasMany(models.orders_products, {
      foreignKey: "id_orders",
      as: "OrdersProducts"
    });

    orders.hasOne(models.addresses, {
      foreignKey: "addressable_id",
      as: "OrdersAddresse",
      constraints: false,
      scope: {
        addressable_type: "orders"
      }
    });

    orders.belongsTo(models.customers, {
      foreignKey: "id_customers",
      as: "Customers"
    });
  };

  return orders;
};
