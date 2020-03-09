"use strict";
module.exports = (sequelize, DataTypes) => {
  const admins = sequelize.define(
    "admins",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,

          notEmpty: true
        }
      }
    },
    {}
  );
  admins.associate = function(models) {
    admins.belongsTo(models.users, { foreignKey: "id", as: "User" });
  };
  return admins;
};
