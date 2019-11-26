
module.exports = (sequelize,DataTypes)=>{
    const carts = sequelize.define("carts",{
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          } 
    })

    carts.associate = function(models) {
        carts.belongsToMany(models.products,{foreignKey:'id_cart',through:'cart_products',as:'products'});
        carts.belongsTo(models.customers,{foreignKey:'id_customers',as:'customers'});
    }

    return carts;
}