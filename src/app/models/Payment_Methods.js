
module.exports = (sequelize,DataTypes)=>{
    const Payment_Methods = sequelize.define("Payment_Methods",{
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true, 
                len: [1,20],
                notEmpty: true,
               }
        }, 
        status:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true
        }
    })

    Payment_Methods.associate = function(models) {
        Payment_Methods.hasMany(models.Sales_Historys,{foreignKey:'id_payment_methods',as:'sales_historys'});
    }

return Payment_Methods;
}