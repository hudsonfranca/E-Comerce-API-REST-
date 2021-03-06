module.exports = (sequelize, DataTypes) => {
  const carts = sequelize.define("carts", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  carts.associate = function(models) {
    carts.belongsToMany(models.products, {
      foreignKey: "id_cart",
      through: "cart_products",
      as: "Products"
    });
    carts.belongsTo(models.customers, {
      foreignKey: "id_customers",
      as: "customers"
    });
    carts.hasMany(models.cart_products, {
      foreignKey: "id_cart",
      as: "CartProducts"
    });
  };

  return carts;
};
