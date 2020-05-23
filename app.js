// Carregando módulos
    const express = require("express");
    const app = express();


    app.use((req,res,next)=>{
        res.status(200).send({
            message:"Ok"
        })
    });


// Definindo server
    const port = process.env.PORT || 8081;
    app.listen(port, ()=>{
        console.log("Server ok")
    });