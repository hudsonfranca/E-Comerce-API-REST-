const Decimal = require('decimal.js');
const {payment_methods} = require('../models');
const {customers} = require('../models');
const {products} = require('../models');
const {carts} = require('../models');
const {sales_historys} = require('../models');
const sequelize = require('../models').sequelize;

module.exports = {
    async index(req,res){

       

         try{	

            const response  =  await sequelize.transaction(async(t)=>{

                const allSalesHistory = await sales_historys.findAll({
                    attributes: ["id","date","id_customers","id_payment_methods","amount"], 
                    transaction:t,
                    include: { 
                      association: 'Products', 
                      attributes: ["id","name","description", "price", "status"], 
                      through: { 
                        attributes: []
                      } 
                    }

                });

                return allSalesHistory;
        
            })


           return res.status(200).json(response)


         }catch(err){
            res.status(400).json({error:"unable to return sales historys."});
            console.log(err);
            return
         }



    },
    async store(req,res){

        const {id_payment_methods} = req.body;

        const findCustomer = await customers.findByPk(req.userId);
        const findPaymentMethods = await payment_methods.findByPk(id_payment_methods);

        if(!findCustomer){
            res.status(401).json({error:"Sign in or create an account."})
            return 
         }else if(!findPaymentMethods){
            res.status(400).json({error:"This Payment Method dos not exist"})
            return 
         }

      
        try{

             await sequelize.transaction(async(t)=>{

                 const customerCartProducts = await carts.findOne({
                    attributes: [],
                    where:{id_customers:findCustomer.id},
                    transaction:t,
                    include: { 
                      association: 'Products', 
                      attributes: ["id","name","description", "price", "status"], 
                      through: { 
                        attributes: []
                      } 
                    }
                  })

            
                 if(!customerCartProducts){
                    res.status(400).json({error:"Your cart is empty"})
                    return
                 }

                 const validProducts = customerCartProducts.Products.filter((product)=>{
                    return product.status === true ;
                 })

                 const amount = validProducts.reduce(( prevVal, elem )=>{
                    return new Decimal(prevVal).plus(elem.price)
                 },0)

                await sales_historys.create({
                    id_customers:findCustomer.id,
                    id_payment_methods,
                    amount
                 },{transaction:t}).then((sale)=>{
                     //add products to sales_history_products
                    return Promise.all(
                    validProducts.map(async(product)=>{
                        let findProduct = await products.findByPk(product.id)
                        await sale.addProducts(findProduct,{transaction:t})
                        
                        })
                    )

                 })
           

            })
                res.json({ok:true});
                return 
            

        }catch(err){
            console.log(err);
            res.status(400).json({error:"Unable to register this sale."});
            return 
           
           

        }
 
    },
    async delete(req,res){

        const {id} = req.params;

        
        const findSalesHistory = await sales_historys.findByPk(id);

        if(!findSalesHistory){
             res.status(400).json({error:"This sale dos not exist."})
             return
        }

        try{
            const response  =  await sequelize.transaction(async(t)=>{

                await sales_historys.destroy({
                    where:{id:findSalesHistory.id},
                    transaction:t
                })
              

            })

            return res.status(200).json();

           
        }catch(err){
            res.status(400).json({error:"Unable to delete this sale."});
            console.log(err);
            return
        }

        

    },

    // async update(req,res){
    //     const {id} = req.params;

    //  try{
    //         const response  =  await sequelize.transaction(async(t)=>{

    //             const findSalesHistory = await sales_historys.findByPk(id,{transaction:t});

    //             if(!findSalesHistory){
    //                  res.status(400).json({error:"This sale dos not exist."})
    //                  return
    //             }

    //             const [lines,updatedSalesHistory] = await sales_historys.update(req.body,{
    //                 where: { id:findSalesHistory.id },
    //                 returning: true,
    //                 transaction:t
    //               });

    //               return updatedSalesHistory;

    //         })

    //         res.status(200).json(response);

           
    //     }catch(err){
    //         res.status(400).json({error:"Unable to update this sale."});
    //         console.log(err);
    //         return
    //     }

       
    // }
}
