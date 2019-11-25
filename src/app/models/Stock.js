
module.exports = (sequelize,DataTypes)=>{
    const Stock = sequelize.define("Stock",{
        
        quantity:{
            type:DataTypes.INTEGER,
            allowNull: false,
           
            validate:{
                notNull: true,
                isInt: true,
            },
        }
    })
    Stock.associate = function(models) {
       Stock.belongsTo(models.Products,{foreignKey:"id_product", as:'products'});
    }

    return Stock;
}