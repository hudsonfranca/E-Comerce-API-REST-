const {stock} = require('../models')
const {products} = require('../models')
const sequelize = require('../models').sequelize;


module.exports = {

    async index(req,res){

        const {id} = req.params;

        try{
            const response  =  await sequelize.transaction(async(t)=>{
                const findStockByproductId = await products.findByPk(id,{
                    attributes:[],
                    transaction:t,
                    include:[{
                        association:'Stock',
                        attributes:["id","quantity","id_product"],
                    }]
                })

                return findStockByproductId;
            })
       

        res.status(200).json(response);
        return ;

        }catch(err){
            res.status(400).json({error:"Unable to display this stock"});
            console.log(err);
            return
        }
        
        
    },
    async store(req,res){

        const {id} = req.params;
        const {quantity} = req.body;

        const findProduct = await products.findByPk(id);

        if(!findProduct){
            res.status(400).json({error:"This stock does not exist."});
            return
        }

        try{

            const response  =  await sequelize.transaction(async(t)=>{
             const [stockCreated] = await stock.findOrCreate({
             where:{id_product:findProduct.id},
             defaults: {quantity},
             transaction:t
            });

                return stockCreated;
            })

            res.status(201).json(response);
            return;

        }catch(err){
            res.status(400).json({error:"Unable to register this stock."});
            console.log(err);
            return
        }
  
    },
    async delete(req,res){

        const {id} = req.params;

        const findStock = await stock.findByPk(id);

        if(!findStock){
            res.status(400).json({error:"This stock does not exist."})
            return
        }

        try{

             await sequelize.transaction(async(t)=>{
                await stock.destroy({
                    where:{id},
                    transaction:t
                })
            })

            res.status(200).send()

        }catch(err){
            res.status(400).json({error:"Unable to delete this stock."});
            console.log(err);
            return
        }
       
    },
    
    async update(req,res){
        const {id} = req.params;

        const findStock = await stock.findByPk(id);

        if(!findStock){
            res.status(400).json({error:"This stock does not exist."})
            return
        }

        try{
            const response  =  await sequelize.transaction(async(t)=>{

            const [updatedLines,updatedStock] = await stock.update(req.body,{
                    where: { id },
                    returning: true,
                    transaction:t
                  });

                  return updatedStock;

            })

            res.status(200).json(response);

            return
        }catch(err){
            res.status(400).json({error:"Unable to update this stock."});
            console.log(err);
            return
        }
      
    }
}