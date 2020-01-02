"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define(
    "favorites",
    {
      id_customers: {
        type: DataTypes.INTEGER,
        allowNull: false,

        validate: {
          notNull: true,
          isInt: true
        }
      }
    },
    {}
  );
  favorites.associate = function(models) {
    favorites.belongsTo(models.customers, {
      foreignKey: "id_customers",
      as: "customer"
    });
    favorites.belongsToMany(models.products, {
      foreignKey: "id_favorites",
      through: "favorites_products",
      as: "Products"
    });
  };
  return favorites;
};
