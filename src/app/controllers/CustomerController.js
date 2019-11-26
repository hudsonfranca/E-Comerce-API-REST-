const {Customers} = require('../models')
const db = require('../models')


module.exports = {

    async index(req,res){

        return res.status(200).send()
    },

   async store(req,res){

    const {first_name,last_name,email_address,cpf,phone_number,password} = req.body;
    
    const email = await Customers.findOne({
        where:{email_address}
    })

    if(email){
        res.status(400).json({error:"Choose another email."});
        return 
    }

    const customerCpf = await Customers.findOne({
        where:{cpf}
    })

    if(customerCpf){
        res.status(400).json({error:"Choose another cpf."});
        return 
    }
   


    try{

        const response  =  await db.sequelize.transaction(async(t)=>{

            const customer = await Customers.create({
                first_name,last_name,email_address,cpf,phone_number,password
            },{transaction:t})

            return customer;
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