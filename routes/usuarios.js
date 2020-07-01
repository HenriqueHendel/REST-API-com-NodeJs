const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const controller = require("../controllers/usuario_controller");

router.post("/cadastro", controller.cadastro);
router.post("/login", controller.login);

module.exports = router;