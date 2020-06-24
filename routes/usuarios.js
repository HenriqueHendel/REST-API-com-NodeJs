const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

router.post("/login",(req,res,next)=>{
    mysql.getConnection((erro,conn)=>{
        if(erro){return res.status(500).send({Erro: erro})}
        conn.query("SELECT * FROM usuarios WHERE email=?",[req.body.email],(error,result,fields)=>{
            conn.release();
            if(error){return res.status(500).send({Erro: error})};
            if(result.length<1){
                return res.status(401).send({message: "Falha na autenticação"});
            }
            bcrypt.compare(req.body.senha,result[0].senha,(erro,response)=>{
                if(erro){return res.status(401).send({message:"Falha na autenticação"})};
                if(response){
                    const token = jwt.sign({
                        id_usuario:result[0].id_usuario,
                        email: result[0].email
                        },
                        process.env.JWT_KEY || "segredo",
                        {
                            expiresIn:"1h"
                        }
                    );

                    return res.status(200).send({message:"Autenticado com Sucesso",token:token});
                };
                return res.status(401).send({message:"Falha na autenticação"});

            })
        })
    })
})

module.exports = router;