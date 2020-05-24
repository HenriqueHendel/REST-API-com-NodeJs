const express = require("express");
const router = express.Router();

// Rota para listar pedidos

router.use((req,res,next)=>{
    console.log("Henrique");
    next();
})

router.get("/",(req,res,next)=>{
    res.status(200).send({
        message:"Usando o GET dentro da rota de pedidos"
    })
});

// Rota para adicionar pedido
router.post("/", (req,res,next)=>{
    const pedido ={
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        message: "Usando o POST dentro da rota de pedidos",
        pedidoCriado: pedido
    })
})

// Rota para listar pedido específico
router.get("/:id",(req,res,next)=>{
    res.status(200).send({
        message:"Usando o GET em um pedido específico",
        id:req.params.id
    })
})

// Rota para deletar um pedido
router.delete("/",(req,res,next)=>{
    res.status(201).send({
        message:"Usando o DELETE dentro da rota de pedido"
    })
})


module.exports = router;