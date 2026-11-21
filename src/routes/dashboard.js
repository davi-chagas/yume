var express = require('express');
var router = express.Router();

var dashboardController = require('../controllers/dashboardController')

router.get('/engagement', function (req, res) {
    dashboardController.getEngajamento(req, res)
});

router.get('/count-posts', function (req, res) {
    dashboardController.getContagemPostagens(req, res)
});

router.get('/bigger-engagement', function (req, res) {
    dashboardController.getPostagemMaiorEngajamento(req, res);
})

router.get('/likes', function (req, res) {
    dashboardController.getCurtidasPorMes(req, res);
})

router.get('/comments', function (req, res) {
    dashboardController.getComentariosPorMes(req, res);
})

router.get('/', function (req, res) {
    dashboardController.getTodasPostagensDoUsuario(req, res);
})

router.delete('/:post_id', function (req, res) {
    dashboardController.excluirPost(req, res);
})

module.exports = router ;