// Carregando módulos
    const express = require("express");
    const app = express();
    const produtos = require("./routes/produtos");
    const pedidos = require("./routes/pedidos");
    const morgan = require("morgan");

    app.use(morgan("dev"));

    app.use("/produtos", produtos);
    app.use("/pedidos", pedidos);

    app.use((req,res,next)=>{
        const error = new Error("Essa rota não existe");
        error.status = 404;
        next(error);
    })

    app.use((error,req,res,next)=>{
        res.status(error.status || 500);

        return res.send({
            message:error.message
        })
    })


// Definindo server
    const port = process.env.PORT || 8081;
    app.listen(port, ()=>{
        console.log("Server ok")
    });