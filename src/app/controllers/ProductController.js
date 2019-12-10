const {products} = require('../models');
const {brands} = require('../models');
const {categories} = require('../models');
const {images} = require('../models');
const sequelize = require('../models').sequelize;

module.exports = {
    async index(req,res){

       

         try{

            const response  =  await sequelize.transaction(async(t)=>{
                
                
                const allProducts = await products.findAll({
                    attributes:["id","name","description","price", "status"],
                    include:[{association:'Images',attributes:["url"]}]
                })
                
               

                return allProducts;
        
            })


            return res.status(200).json(response)


         }catch(err){
            res.status(400).json({error:"unable to return products."});
            console.log(err);
            return
         }



    },
    async store(req,res){

        // console.log(req.body);
        // console.log(req.files);

        // return res.json({ok:true})


        const {name,brand_id,description,price,status} = req.body;
        const files = req.files;

        const findBrand = await brands.findByPk(brand_id);
        const findCategorie = await categories.findByPk(req.params.categorie_id);

        if(!findBrand){
            res.status(400).json({error:"This brand not exists"})
            return
        }else if(!findCategorie){
            res.status(400).json({error:"This categorie not exists"})
            return
        }else if(price < 0 ){
            return  res.status(400).json({error:"Price cannot be negative"})
        }


        try{

            const response  =  await sequelize.transaction(async(t)=>{

                const productCreated = await products.create({
                    name,
                    brand_id,
                    description,
                    price,
                    status
                },{transaction:t})

                await productCreated.addCategories(findCategorie,{transaction:t});

                //add urls to images
                if(productCreated){
                    let imgs = [];

                    files.map((fn)=>{
                        imgs.push({url:fn.filename,
                            
                            id_product:productCreated.id})
                    })

                    await images.bulkCreate(imgs,{ transaction: t })
                }

                return productCreated;

            })

            res.status(201).json(response);
            return;

        }catch(err){
            res.status(400).json({error:"Unable to register this product."});
            console.log(err);
            return

        }
 
    },
    async delete(req,res){

        const {id} = req.params;

        const findProduct = await products.findByPk(id);

        if(!findProduct){
            res.status(400).json({error:"This product does not exist"})
            return
        }

        try{
            const response  =  await sequelize.transaction(async(t)=>{

                await products.destroy({
                    where: { id:findProduct.id },
                    transaction:t
                  });

            })

            res.status(200).send()

            return
        }catch(err){
            res.status(400).json({error:"Unable to delete this product."});
            console.log(err);
            return
        }

        

    },

    async update(req,res){

        const {id} = req.params;

        const findProduct = await products.findByPk(id);

        if(!findProduct){
            res.status(400).json({error:"This product does not exist"})
            return
        }


     try{
            const response  =  await sequelize.transaction(async(t)=>{

            const [lines,updatedProduct] = await products.update(req.body,{
                    where: { id },
                    returning: true,
                    transaction:t
                  });

                  return updatedProduct;

            })

            res.status(200).json(response);
            return
        }catch(err){
            res.status(400).json({error:"Unable to update this product."});
            console.log(err);
            return
        }

       
    }
}


