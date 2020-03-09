module.exports = (sequelize, DataTypes) => {
  const orders_products = sequelize.define("orders_products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });

  orders_products.associate = function(models) {
    orders_products.belongsTo(models.products, {
      foreignKey: "id_products",
      as: "Products"
    });
    orders_products.belongsTo(models.orders, {
      foreignKey: "id_orders",
      as: "Orders"
    });
  };

  return orders_products;
};
