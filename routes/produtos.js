const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const multer = require("multer");
const login = require("../middleware/login");
const controller = require("../controllers/produtos_controller");

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
router.get("/", controller.getProdutos);

// Rota para adicionar produtos
router.post("/", login.obrigatorio, upload.single("produto_imagem"), controller.postProduto);

// Rota para listar produtos específicos
router.get("/:id", controller.getProdutoEspecifico);

// Rota para alterar algo de um produto
router.patch("/",login.obrigatorio, controller.patchProduto);

// Rota para deletar um produto
router.delete("/",login.obrigatorio, controller.deleteProduto);


module.exports = router;