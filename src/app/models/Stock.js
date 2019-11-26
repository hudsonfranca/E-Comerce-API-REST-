
module.exports = (sequelize,DataTypes)=>{
    const stock = sequelize.define("stock",{
        
        quantity:{
            type:DataTypes.INTEGER,
            allowNull: false,
           
            validate:{
                notNull: true,
                isInt: true,
            },
        }
    })
    stock.associate = function(models) {
       stock.belongsTo(models.products,{foreignKey:"id_product", as:'products'});
    }

    return stock;
}