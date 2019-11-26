

module.exports = (sequelize,DataTypes)=>{
    const addresses = sequelize.define("addresses",{
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

    addresses.associate = function(models) {
        addresses.belongsTo(models.customers,{foreignKey:'id_customers',as:'customers'})
    }
    


    return addresses;
}






