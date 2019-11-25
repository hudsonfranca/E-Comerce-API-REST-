
module.exports = (sequelize,DataTypes)=>{
    const Products= sequelize.define("Products",{

        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
             notNull: true, 
             len: [1,50],
             notEmpty: true, 
            
            }
        },
        description:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true, 
                len: [1,2000],
                notEmpty: true,
               }
        },
       
        price:{
            type:DataTypes.DECIMAL,
            allowNull: false,
            validate:{
                isDecimal:true, 
            }
        },
        status:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true
            
        }

        
    })
    Products.associate = function(models) {
        Products.belongsToMany(models.Sales_Historys,{foreignKey:'id_products', through:'sales_history_products',   as:'sales'});

        Products.belongsToMany(models.Categories,{foreignKey:'id_product',through:'products_categories',as:'categories'});

        Products.belongsToMany(models.Carts,{foreignKey:'id_product',through:'cart_products',as:'carts'});

        Products.hasMany(models.Images,{foreignKey:'id_product',as:'images'});

        Products.hasOne(models.Stock,{foreignKey:'id_product',as:'stock'})
    }

    return Products;
}