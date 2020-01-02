"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorites_Products = sequelize.define(
    "Favorites_Products",
    {
      id_favorites: DataTypes.INTEGER,
      id_products: DataTypes.INTEGER
    },
    {}
  );
  Favorites_Products.associate = function(models) {
    // associations can be defined here
  };
  return Favorites_Products;
};
