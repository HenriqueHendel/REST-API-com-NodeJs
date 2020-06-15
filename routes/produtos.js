const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const multer = require("multer");

const storage = multer.diskStorage({
    dest:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }
});

const filter = (req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image.jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload = multer({storage:storage});
 
// Rota para listar produtos
router.get("/",(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})};
        conn.query("SELECT * from produtos",null,(error,result,fields)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error
                })
            }

            const response={
                quantidade:result.length,
                produtos: result.map(prod=>{
                    return {
                        id_produto:prod.id_produto,
                        nome: prod.nome,
                        preco:prod.preco,
                        imagem_produto: prod.produto_image,
                        request:{
                            tipo:"GET",
                            descricao:"Retorna todos os produtos",
                            url:"https://localhost:8081/produtos/"+prod.id_produto
                        }
                    };
                })

            };
            res.status(200).send({response});
        })
    })
});

// Rota para adicionar produtos
router.post("/", upload.single("produto_imagem"), (req,res,next)=>{
    console.log(req.file);
    mysql.getConnection((erro,conn)=>{
        if(erro){return res.status(500).send({error:erro})};
        conn.query("INSERT INTO produtos (nome, preco, produto_image) values (?,?,?)",
        [req.body.nome, req.body.preco, req.file.path],
        (error,result,field)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    response:null
                });
            }
            const response = {
                message:"Produto inserido com sucesso",
                produtoCriado:{
                    id_produto:result.insertId,
                    nome:req.body.nome,
                    preco:req.body.preco,
                    request:{
                        tipo:"POST",
                        descricao:"Insere um produto",
                        url:"https://localhost:8081/produtos/"
                    }
                }
            }
            res.status(201).send(response);

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