module.exports = (sequelize,DataTypes)=>{
    const brands = sequelize.define("brands",{

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

    return brands;

}