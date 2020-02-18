module.exports = (sequelize, DataTypes) => {
  const sales_historys = sequelize.define("sales_historys", {
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
    }
  });

  sales_historys.associate = function(models) {
    sales_historys.belongsToMany(models.products, {
      foreignKey: "id_sales_history",
      through: "sales_history_products",
      as: "Products"
    });

    sales_historys.belongsTo(models.payment_methods, {
      foreignKey: "id_payment_methods",
      as: "payment_method"
    });

    sales_historys.belongsTo(models.customers, {
      foreignKey: "id_customers",
      as: "Customers"
    });

    sales_historys.hasOne(models.orders, {
      foreignKey: "id_sales_history",
      as: "Orders"
    });
  };

  return sales_historys;
};
