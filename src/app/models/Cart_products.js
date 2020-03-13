module.exports = (sequelize, DataTypes) => {
  const cart_products = sequelize.define("cart_products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });

  cart_products.associate = function(models) {
    cart_products.belongsTo(models.products, {
      foreignKey: "id_product",
      as: "Products"
    });
    cart_products.belongsTo(models.carts, {
      foreignKey: "id_cart",
      as: "Cart"
    });
  };

  return cart_products;
};
