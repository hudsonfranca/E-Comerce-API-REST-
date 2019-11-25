module.exports = (sequelize,DataTypes)=>{
    const Brands = sequelize.define("Brands",{

        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
             notNull: true, 
             len: [1,50],
             notEmpty: true, 
            
            }
        }
        
    })

    return Brands;

}