require("dotenv").config({
    path:process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const express = require('express');

class AppController{
    constructor(){
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(express.json());
    }

    routes(){
        this.express.use(require('./routes'));
    }
}

//git remote add origin https://github.com/hudsonfranca/E-comerce-API.git
//git push -u origin master

module.exports = new AppController().express;