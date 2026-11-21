var dashboardModel = require('../models/dashboardModel');

function getEngajamento(req, res) {
    var usuario_id = req.query.user_id || req.query.usuario_id;

    dashboardModel.engajamento(usuario_id).then((result) => {
        res.json(result)
    })
};

function getContagemPostagens(req, res) {
    var usuario_id = req.query.user_id || req.query.usuario_id;

    dashboardModel.contarPostagens(usuario_id).then((result) => {
        res.json(result);
    })
}

function getPostagemMaiorEngajamento(req, res) {
    var usuario_id = req.query.user_id || req.query.usuario_id;

    dashboardModel.postagemMaiorEngajamento(usuario_id).then((result) => {
        res.json(result)
    })
};

function getCurtidasPorMes(req, res) {
    var usuario_id = req.query.user_id || req.query.usuario_id;

    dashboardModel.curtidasPorMes(usuario_id).then((result) => {
        res.json(result)
    })
}

function getComentariosPorMes(req, res) {
    var usuario_id = req.query.user_id || req.query.usuario_id;

    dashboardModel.comentariosPorMes(usuario_id).then((result) => {
        res.json(result)
    })
}

function getTodasPostagensDoUsuario(req, res) {
    var usuario_id = req.query.user_id || req.query.usuario_id;

    dashboardModel.todasPostagensDoUsuario(usuario_id).then((result) => {
        res.json(result)
    })
}

function excluirPost(req, res) {
    var postagem_id = req.params.post_id || req.params.postagem_id;
    var usuario_id = req.query.user_id || req.query.usuario_id;

    dashboardModel.excluirPost(postagem_id, usuario_id)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err.sqlMessage);
        });
}
module.exports = { getEngajamento, getContagemPostagens, excluirPost, getPostagemMaiorEngajamento, getCurtidasPorMes, getComentariosPorMes, getTodasPostagensDoUsuario };
