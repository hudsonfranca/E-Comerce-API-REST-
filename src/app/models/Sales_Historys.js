
module.exports = (sequelize,DataTypes)=>{
    const sales_historys = sequelize.define("sales_historys",{
        amount:{
            type:DataTypes.DECIMAL,
            allowNull: false,
            validate:{
                isDecimal:true, 
            }
        }
    })

    sales_historys.associate = function(models) {
        sales_historys.belongsToMany(models.products,{ foreignKey:'id_sales_history', through:'sales_history_products', as:'products' });

        sales_historys.belongsTo(models.payment_methods,{foreignKey:'id_payment_methods',as:'payment_method'});
    }

    return sales_historys;
}