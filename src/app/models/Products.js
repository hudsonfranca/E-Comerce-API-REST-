module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define("products", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: [1, 50],
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: [1, 2000],
        notEmpty: true
      }
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
  products.associate = function(models) {
    products.belongsToMany(models.sales_historys, {
      foreignKey: "id_products",
      through: "sales_history_products",
      as: "Sales"
    });

    products.belongsToMany(models.favorites, {
      foreignKey: "id_products",
      through: "favorites_products",
      as: "Favorite"
    });

    products.belongsToMany(models.categories, {
      foreignKey: "id_product",
      through: "products_categories",
      as: "Categories"
    });

    products.belongsToMany(models.carts, {
      foreignKey: "id_product",
      through: "cart_products",
      as: "Carts"
    });

    products.hasMany(models.images, { foreignKey: "id_product", as: "Images" });

    products.hasOne(models.stock, { foreignKey: "id_product", as: "Stock" });

    products.belongsTo(models.brands, { foreignKey: "brand_id", as: "Brand" });
  };

  return products;
};
