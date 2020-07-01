const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const controller = require("../controllers/pedidos-controller");

// Rota para listar pedidos
router.get("/", controller.getPedidos);

// Rota para adicionar pedido
router.post("/", controller.postPedido);

// Rota para listar pedido específico
router.get("/:id",controller.getPedidoEspecifico);

// Rota para deletar um pedido
router.delete("/",controller.deletePedido);


module.exports = router;