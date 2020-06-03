const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

// Rota para listar produtos
router.get("/",(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})};
        conn.query("SELECT * from produtos",null,(error,resultado,fields)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error
                })
            }
            res.status(200).send({response:resultado});
        })
    })
});

// Rota para adicionar produtos
router.post("/", (req,res,next)=>{
    mysql.getConnection((erro,conn)=>{
        if(erro){return res.status(500).send({error:erro})};
        conn.query("INSERT INTO produtos (nome, preco) values (?,?)",
        [req.body.nome, req.body.preco],
        (error,resultado,field)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    response:null
                });
            }
            res.status(201).send({
                message:"Produto inserido com sucesso",
                id_produto: resultado
            });

        })
    })
})

// Rota para listar produtos específicos
router.get("/:id",(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})};
        conn.query("SELECT * from produtos where id_produto=?",[req.params.id],(error,resultado,fields)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error
                })
            }
            res.status(200).send({response:resultado});
        })
    })
})

// Rota para alterar algo de um produto
router.patch("/",(req,res,next)=>{
    mysql.getConnection((erro,conn)=>{
        if(erro){return res.status(500).send({error:erro})};
        conn.query("UPDATE produtos set nome = ?, preco=? where id_produto=?",
        [req.body.nome, req.body.preco, req.body.id_produto],
        (error,resultado,field)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    response:null
                });
            }
            res.status(202).send({
                message:"Produto alterado com sucesso",
                id_produto: resultado
            });

        })
    })
})

// Rota para deletar um produto
router.delete("/",(req,res,next)=>{
    mysql.getConnection((erro,conn)=>{
        if(erro){return res.status(500).send({error:erro})};
        conn.query("delete from produtos where id_produto = ?",
        [ req.body.id_produto],
        (error,resultado,field)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    response:null
                });
            }
            res.status(202).send({
                message:"Produto deletado com sucesso",
                id_produto: resultado
            });

        })
    })
})


module.exports = router;