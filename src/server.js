const app = require('./app');

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
});

