const mysql = require("../mysql").pool;

exports.getProdutos = (req,res,next)=>{
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
};

exports.postProduto = (req,res,next)=>{
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
};

exports.getProdutoEspecifico = (req,res,next)=>{
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
};

exports.patchProduto = (req,res,next)=>{
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
};

exports.deleteProduto = (req,res,next)=>{
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
};