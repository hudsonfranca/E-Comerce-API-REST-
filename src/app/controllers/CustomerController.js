const {customers} = require('../models')
const db = require('../models')


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

        const response  =  await db.sequelize.transaction(async(t)=>{

            const createdCustomer = await customers.create({
                first_name,last_name,email_address,cpf,phone_number,password
            },{transaction:t})

            return createdCustomer;
        })
       

        return res.status(201).json(response)

    }catch(err){
        return  res.status(400).json({err:err});
    }
    

       
    },

    async update(req,res){

        

        return res.status(200).send()
    },
    
}