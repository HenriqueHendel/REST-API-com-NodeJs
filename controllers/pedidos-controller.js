const mysql = require("../mysql").pool;

exports.getPedidos = (req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})};
        conn.query(`SELECT pedidos.id_pedido, pedidos.quantidade, produtos.id_produto, produtos.nome, produtos.preco FROM pedidos INNER JOIN produtos ON pedidos.id_produto=produtos.id_produto;`,null,(error,result,fields)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error
                })
            }

            const response={
                pedidos: result.map(pedido=>{
                    return {
                        id_pedido:pedido.id_pedido,
                        quantidade:pedido.quantidade,
                        produto:{
                            id_produto: pedido.id_produto,
                            nome: pedido.nome,
                            preco: pedido.preco
                        },
                        request:{
                            tipo:"GET",
                            descricao:"Retorna todos os pedidos",
                            url:"https://localhost:8081/pedidos/"+pedido.id_pedido
                        }
                    };
                })
            };
            res.status(200).send({response});
        })
    })
}

exports.postPedido = (req,res,next)=>{
    mysql.getConnection((erro,conn)=>{
        if(erro){return res.status(500).send({erro:erro})};
        conn.query("select * from produtos where id_produto = ?", [req.body.id_produto], (erro,result,field)=>{
            if(erro){
                res.status(500).send({
                    erro:erro
                })
            }
            if(result.length==0){
                res.status(404).send({
                    erro:"Não há produtos com esse id"
                })
            }
            conn.query("INSERT INTO pedidos (id_produto, quantidade) values (?,?)",
            [req.body.id_produto, req.body.quantidade],
            (error,result,field)=>{
                conn.release();
                if(error){
                    return res.status(500).send({
                        error:error,
                        response:null
                    });
                }
                const response = {
                    message:"Pedido inserido com sucesso",
                    pedidoCriado:{
                        id_pedido:result.insertId,
                        id_produto:req.body.id_produto,
                        quantidade:req.body.quantidade,
                        request:{
                            tipo:"POST",
                            descricao:"Insere um pedido",
                            url:"https://localhost:8081/pedidos/"
                        }
                    }
                }
                res.status(201).send(response);
    
            })
        })
    })
}

exports.getPedidoEspecifico = (req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})};
        conn.query("SELECT * from pedidos where id_pedido=?",[req.params.id],(error,resultado,fields)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error
                })
            }
            res.status(200).send({response:resultado});
        })
    })
}

exports.deletePedido = (req,res,next)=>{
    mysql.getConnection((erro,conn)=>{
        if(erro){return res.status(500).send({error:erro})};
        conn.query("delete from pedidos where id_pedido = ?",
        [req.body.id_pedido],
        (error,resultado,field)=>{
            conn.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    response:null
                });
            }
            if(resultado.affectedRows==0){
                return res.status(202).send({
                    message:"Não há pedidos com esse id"
                })
            }
            res.status(202).send({
                message:"Pedido deletado com sucesso",
                id_pedido: resultado
            });

        })
    })
}