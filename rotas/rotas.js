const express = require("express");

const controller = require("../controllers/controller.js");
const router = express.Router(); 

router.get('/', controller.listarProduto);
router.get('/buscar/:id', controller.buscarProduto);
router.post('/cadastro', controller.cadastrarProduto);

module.exports = router;