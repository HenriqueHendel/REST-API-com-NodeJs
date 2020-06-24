const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");

router.post("/cadastro", (req, res, next)=>{
    mysql.getConnection((erro,conn)=>{
        if(erro){return res.status(404).send({erro:erro})};
        conn.query("select * from usuarios where email = ?;",[req.body.email],(erro,result)=>{
            if(erro){return res.status(500).send({error:erro})};
            if(result.length>0){
                conn.release();
                return res.status(409).send({message: "Esse email já está cadastrado"});
            }
        })
        bcrypt.hash(req.body.senha,10,(erro,hash)=>{
            if(erro){return res.status(500).send({erro:erro})};
            conn.query("INSERT INTO usuarios (email,senha) values (?,?);",[req.body.email,hash], (erro, result)=>{
                conn.release();
                if(erro){return res.status(500).send({erro:erro})};
                const response = {
                    message:"Usuário Criado com Sucesso",
                    usuarioCriado:{
                        id_usuario: result.insertId,
                        email:req.body.email
                    }
                };
                return res.status(201).send(response);
            });
        });
    });
});

module.exports = router;