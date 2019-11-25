
module.exports = (sequelize,DataTypes)=>{
    const Carts = sequelize.define("Carts",{
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          } 
    })

    Carts.associate = function(models) {
        Carts.belongsToMany(models.Products,{foreignKey:'id_cart',through:'cart_products',as:'products'});
        Carts.belongsTo(models.Customers,{foreignKey:'id_customers',as:'customers'});
    }

    return Carts;
}