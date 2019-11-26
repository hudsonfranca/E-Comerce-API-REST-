

module.exports = (sequelize,DataTypes)=>{
    const Addresses = sequelize.define("Addresses",{
        street_address:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true, 
                len: [1,150],
                notEmpty: true,
               }
          },
          city:{
            type:DataTypes.STRING,
            allowNull: false,
            
            validate:{
                notNull: true, 
                len: [1,100],
                notEmpty: true,
               }
          },
          zip:{
            type:DataTypes.STRING,
            allowNull: false,
            
            validate:{
                notNull: true, 
                len: [1,20],
                notEmpty: true,
               }
          },
          country:{
            type:DataTypes.STRING,
            allowNull: false,
            
            validate:{
                notNull: true, 
                len: [1,30],
                notEmpty: true,
               }
          },
          state:{
            type:DataTypes.STRING,
            allowNull: false,
            
            validate:{
                notNull: true, 
                len: [1,30],
                notEmpty: true,
               }
          }
    })

    Addresses.associate = function(models) {
        Addresses.belongsTo(models.Customers,{foreignKey:'id_customers',as:'customers'})
    }
    


    return Addresses;
}






