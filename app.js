// Carregando módulos
    const express = require("express");
    const app = express();
    const produtos = require("./routes/produtos");
    const pedidos = require("./routes/pedidos");

    app.use("/produtos", produtos);
    app.use("/pedidos", pedidos);
    app.use("/teste",(req,res,next)=>{
        res.status(200).send({
            message:"Ok"
        })
    });


// Definindo server
    const port = process.env.PORT || 8081;
    app.listen(port, ()=>{
        console.log("Server ok")
    });