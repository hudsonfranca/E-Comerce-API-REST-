const {products} = require('../models');
const {brands} = require('../models');
const {categories} = require('../models');
const {images} = require('../models');
const sequelize = require('../models').sequelize;

module.exports = {
    async index(req,res){

         const {categorie_id} = req.query;

         try{

            const response  =  await sequelize.transaction(async(t)=>{

                const findCategorie = await categories.findByPk(categorie_id,{
                    attributes:['name'],
                    include:[{
                       association:'Products',
                       attributes:['id','name','brand_id','description','price','status'],
                       include:[{ association:'Images', attributes:['id','url','id_product'],}],
                       through: { 
                        attributes: []
                      }
                      
                    },]
                })

                return findCategorie;
        
            })

            if(!response){
                res.status(400).json({error:"This categorie not exists"})
                return
            }

            return res.status(200).json(response)


         }catch(err){

         }

       
        
      return  res.status(200).json(findCategorie);


    },
    async store(req,res){

        const {name,brand_id,description,price,status,url_images} = req.body;

        console.log(req.body)

        const findBrand = await brands.findByPk(brand_id);
        const findCategorie = await categories.findByPk(req.params.categorie_id);

        if(!findBrand){
            res.status(400).json({error:"This brand not exists"})
            return
        }else if(!findCategorie){
            res.status(400).json({error:"This categorie not exists"})
            return
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

                if(productCreated){
                    let imgs = [];

                    url_images.map((url)=>{
                        imgs.push({url:url,id_product:productCreated.id})
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
            res.status(400).json({error:"This product not exists"})
            return
        }

        try{
            const response  =  await sequelize.transaction(async(t)=>{

                await products.destroy({
                    where: { id }
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
            res.status(400).json({error:"This product not exists"})
            return
        }


     try{
            const response  =  await sequelize.transaction(async(t)=>{

            const updatedProduct = await products.update(req.body,{
                    where: { id }
                  });

                  return updatedProduct;

            })

            res.status(200).json(response);

            return
        }catch(err){
            res.status(400).json({error:"Unable to delete this product."});
            console.log(err);
            return
        }

       
    }
}
