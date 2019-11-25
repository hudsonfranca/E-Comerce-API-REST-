
module.exports = (sequelize,DataTypes)=>{
    const Categories = sequelize.define("Categories",{
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

    Categories.associate = function(models) {
        Categories.belongsToMany(models.Products,{foreignKey:'id_categorie',through:'products_categories',as:'products'});
    }

return Categories;
}