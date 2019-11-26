
module.exports = (sequelize,DataTypes)=>{
    const categories = sequelize.define("categories",{
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          } ,
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true,
                notEmpty: true,
                len: [1,100],
                 }
            }
    })

    categories.associate = function(models) {
        categories.belongsToMany(models.products,{foreignKey:'id_categorie',through:'products_categories',as:'products'});
    }

return categories;
}