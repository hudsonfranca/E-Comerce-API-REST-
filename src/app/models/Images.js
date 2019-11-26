
module.exports = (sequelize,DataTypes)=>{
    const images = sequelize.define("images",{
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
    images.associate = function(models) {
       images.belongsTo(models.products,{foreignKey:'id_product',as:'products'});
    }

return images;
}