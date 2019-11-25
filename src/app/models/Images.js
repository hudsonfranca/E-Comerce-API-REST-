
module.exports = (sequelize,DataTypes)=>{
    const Images = sequelize.define("Images",{
        url:{
            type:DataTypes.STRING,
            allowNull: false,
            
            validate:{
                notNull: true, 
                len: [1,300],
                notEmpty: true,
               }
        } 
    })
    Images.associate = function(models) {
       Images.belongsTo(models.Products,{foreignKey:'id_product',as:'products'});
    }

return Images;
}