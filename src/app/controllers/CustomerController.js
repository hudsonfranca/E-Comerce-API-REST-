const {customers} = require('../models')
const sequelize = require('../models').sequelize;


module.exports = {

    async index(req,res){

        const findAllCustomer = await customers.findAll({})
    

        return res.status(200).json(findAllCustomer);
    },

   async store(req,res){

    const {first_name,last_name,email_address,cpf,phone_number,password} = req.body;
    
    const findEmail = await customers.findOne({
        where:{email_address}
    })

    if(findEmail){
        res.status(400).json({error:"Choose another email."});
        return 
    }

    const customerCpf = await customers.findOne({
        where:{cpf}
    })

    if(customerCpf){
        res.status(400).json({error:"Choose another cpf."});
        return 
    }
   


    try{

        const response  =  await sequelize.transaction(async(t)=>{

            const createdCustomer = await customers.create({
                first_name,last_name,email_address,cpf,phone_number,password
            },{transaction:t})

            createdCustomer.password = undefined;

            return {
                createdCustomer,
                token:createdCustomer.generateToken()
            };
        })
       

        return res.status(201).json(response)

    }catch(err){
        return  res.status(400).json({err:err});
    }
    

       
    },

    async delete(req,res){

        const {id} = req.params;

        const findCustomer = await customers.findByPk(id);

        if(!findCustomer){
            res.status(400).json({error:"This cutomer does not exist"})
            return
        }

        try{
            const response  =  await sequelize.transaction(async(t)=>{
                await customers.destroy({
                    where: { id },
                    transaction:t
                  });
            })

            res.status(200).send()
        }catch(err){
            res.status(400).json({error:"Unable to delete this customer."});
            console.log(err);
            return
        }

        return res.status(200).send()
    },

    async update(req,res){

        const {id} = req.params;

        const findCustomer = await customers.findByPk(id);

        if(!findCustomer){
            res.status(400).json({error:"This customer does not exist"})
            return
        }


        try{
            const response  =  await sequelize.transaction(async(t)=>{

            const [lines,updatedCustomer] = await customers.update(req.body,{
                    where: { id },
                    returning: true,
                    transaction:t
                  });

                  

                  return updatedCustomer;

            })

            res.status(200).json(response);

            return
        }catch(err){
            res.status(400).json({error:"Unable to update this customer."});
            console.log(err);
            return
        }


        
    },
    
}