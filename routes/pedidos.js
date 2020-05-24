const express = require("express");
const router = express.Router();

// Rota para listar pedidos
router.get("/",(req,res,next)=>{
    res.status(200).send({
        message:"Usando o GET dentro da rota de pedidos"
    })
});

// Rota para adicionar pedido
router.post("/", (req,res,next)=>{
    res.status(201).send({
        message: "Usando o POST dentro da rota de pedidos"
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