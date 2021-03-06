// Carregando módulos
    const express = require("express");
    const app = express();
    const produtos = require("./routes/produtos");
    const pedidos = require("./routes/pedidos");
    const usuarios = require("./routes/usuarios");
    const morgan = require("morgan");
    const bodyParser = require("body-parser");
    const db = require("./models/connection.js");
    const Produtos = require("./models/produtos.js");
    const Pedidos = require("./models/pedidos.js");
    
    app.use(morgan("dev"));
    app.use("/uploads",express.static("uploads"));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Header","Options, Content-Type, Accept, Authorization");

        if(req.method==="OPTIONS"){
            res.header("Access-Control-Allow-Methods","PUT, DELETE, POST, GET, PATCH");
            return res.status(200).send({})
        }

        next();
    })


    app.use("/produtos", produtos);
    app.use("/pedidos", pedidos);
    app.use("/usuarios",usuarios);

    app.use((req,res,next)=>{
        log();
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