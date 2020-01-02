"use strict";
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    "orders",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          notNull: true,
          len: [1, 15],
          notEmpty: true
        }
      }
    },
    {}
  );
  orders.associate = function(models) {
    orders.belongsTo(models.sales_historys, {
      foreignKey: "id_sales_history",
      as: "Sale"
    });
  };
  return orders;
};
