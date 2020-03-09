module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define("customers", {});

  customers.associate = function(models) {
    customers.hasMany(models.addresses, {
      foreignKey: "id_customers",
      as: "Addresses"
    });

    customers.hasMany(models.orders, {
      foreignKey: "id_customers",
      as: "Orders"
    });

    customers.hasOne(models.carts, { foreignKey: "id_customers", as: "carts" });

    customers.belongsTo(models.users, { foreignKey: "id", as: "User" });

    customers.hasOne(models.favorites, {
      foreignKey: "id_customers",
      as: "favorites"
    });
  };

  return customers;
};
