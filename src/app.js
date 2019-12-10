require("dotenv").config({
    path:process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const path = require('path');

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
        this.express.use('/files',express.static(path.resolve(__dirname,'..','uploads')));
    }
}



module.exports = new AppController().express;