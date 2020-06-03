const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

// Rota para listar produtos
router.get("/",(req,res,next)=>{
    res.status(200).send({
        message:"Usando o GET dentro da rota de produtos"
    })
});

// Rota para adicionar produtos
router.post("/", (req,res,next)=>{
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    
    res.status(201).send({
        message: "Usando o POST dentro da rota de produtos",
        pedidoCriado: produto
    })
})

// Rota para listar produtos específicos
router.get("/:id",(req,res,next)=>{
    res.status(200).send({
        message:"Usando o GET em um produto específico",
        id:req.params.id
    })
})

// Rota para alterar algo de um produto
router.patch("/",(req,res,next)=>{
    res.status(201).send({
        message:"Usando o PATCH dentro da rota de produtos"
    })
})

// Rota para deletar um produto
router.delete("/",(req,res,next)=>{
    res.status(201).send({
        message:"Usando o DELETE dentro da rota de produtos"
    })
})


module.exports = router;