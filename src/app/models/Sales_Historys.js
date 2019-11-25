
module.exports = (sequelize,DataTypes)=>{
    const Sales_Historys = sequelize.define("Sales_Historys",{
        amount:{
            type:DataTypes.DECIMAL,
            allowNull: false,
            validate:{
                isDecimal:true, 
            }
        }
    })

    Sales_Historys.associate = function(models) {
        Sales_Historys.belongsToMany(models.Products,{ foreignKey:'id_sales_history', through:'sales_history_products', as:'products' });

        Sales_Historys.belongsTo(models.Payment_Methods,{foreignKey:'id_payment_methods',as:'payment_method'});
    }

    return Sales_Historys;
}