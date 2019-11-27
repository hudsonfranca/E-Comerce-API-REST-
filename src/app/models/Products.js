
module.exports = (sequelize,DataTypes)=>{
    const products= sequelize.define("products",{

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
    products.associate = function(models) {
        products.belongsToMany(models.sales_historys,{foreignKey:'id_products', through:'sales_history_products',   as:'sales'});

        products.belongsToMany(models.categories,{foreignKey:'id_product',through:'products_categories',as:'Categories'});

        products.belongsToMany(models.carts,{foreignKey:'id_product',through:'cart_products',as:'carts'});

        products.hasMany(models.images,{foreignKey:'id_product',as:'images'});

        products.hasOne(models.stock,{foreignKey:'id_product',as:'stock'});

        products.belongsTo(models.brands,{foreignKey:'brand_id',as:'brand'});
    }

    return products;
}