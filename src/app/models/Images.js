module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define("images", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      get: function() {
        return "http://localhost:3333/files/" + this.getDataValue("image");
      },
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    aspect_ratio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });
  images.associate = function(models) {
    images.belongsTo(models.products, {
      foreignKey: "id_product",
      as: "products"
    });
  };

  return images;
};
