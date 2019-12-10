
module.exports = (sequelize,DataTypes)=>{
    const images = sequelize.define("images",{
        url:{
            type:DataTypes.STRING,
            allowNull: false,
            get:function(){
                return "http://localhost:3333/files/"+this.getDataValue('url') ;
            },
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