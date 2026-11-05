var express = require("express");
var router = express.Router();
var upload = require('../config/configUpload')

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put('/:user_id', upload.single('imagem'), function (req, res){
    usuarioController.updateUser(req, res);
})

module.exports = router;