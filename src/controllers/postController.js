var postModel = require('../models/postModel');

function listarPostagens(req, res) {
    var usuario_id = req.query.user_id || req.query.usuario_id;

    postModel.listarPostagens(usuario_id).then((result) => {
        res.status(200).json(result);
    });
}

function listarComentarios(req, res) {
    postModel.listarComentarios().then((result) => {
        res.status(200).json(result);
    })
}

function criarPost(req, res) {
    var titulo = req.body.title || req.body.titulo;
    var descricao = req.body.description || req.body.descricao;
    var user_id = req.body.user_id || req.body.userId;
    var url_imagem = req.file ? `/assets/${req.file.filename}` : null; // se tiver img envia para assets/ caso nao retorna como null

    if (titulo == undefined) {
        res.status(400).send('Titulo indefinido')
    } else if (user_id == undefined) {
        res.status(400).send('Usuário indefinido')
    } else {
        postModel.criarPost(titulo, descricao, user_id, url_imagem).
            then(function (result) {
                res.json(result)
            })
            .catch(
                function (err) {
                    console.log(err);
                    console.log('Houve um erro ao realizar o post: ' + err.sqlMessage);
                    res.status(500).json(err.sqlMessage)
                }
            )
    }
}

function curtirPost(req, res) {
    var usuario_id = req.body.user_id || req.body.usuario_id;
    var postagem_id = req.body.post_id || req.body.postagem_id;

    postModel.curtirPost(usuario_id, postagem_id)
        .then(
            function (result) {
                res.send(result)
            }
        ).catch(
            function (err) {
                console.log(err);
                console.log('Houve um erro ao realizar o post: ' + err.sqlMessage);
                res.status(500).json(err.sqlMessage)
            }
        )
}

function comentarPost(req, res) {
    var usuario_id = req.body.user_id || req.body.usuario_id;
    var postagem_id = req.body.post_id || req.body.postagem_id;
    var conteudo = req.body.content || req.body.conteudo;

    postModel.comentarPost(usuario_id, postagem_id, conteudo)
        .then(
            function (result) {
                res.send(result)
            }
        ).catch(
            function (err) {
                console.log(err);
                console.log('Houve um erro ao realizar o post: ' + err.sqlMessage);
                res.status(500).json(err.sqlMessage)
            }
        )
}

function deletarComentario(req, res) {
    var postagem_id = req.params.post_id || req.params.postagem_id;
    var usuario_id = req.params.user_id || req.params.usuario_id;

    postModel.deletarComentario(usuario_id, postagem_id)
        .then(
            function (result) {
                res.json(result)
            }
        ).catch(
            function (err) {
                console.log(err);
                console.log('Houve um erro ao realizar o delete: ' + err.sqlMessage);
                res.status(500).json(err.sqlMessage)
            })
}

function deletarCurtida(req, res) {
    var postagem_id = req.params.post_id || req.params.postagem_id;
    var usuario_id = req.params.user_id || req.params.usuario_id;

    postModel.deletarCurtida(postagem_id, usuario_id)
        .then(
            function (result) {
                res.json(result)
            }
        ).catch(
            function (err) {
                console.log(err);
                console.log('Houve um erro ao realizar o delete: ' + err.sqlMessage);
                res.status(500).json(err.sqlMessage)
            })
}

function atualizarPost(req, res) {
    var novo_titulo = req.body.title || req.body.titulo;
    var nova_descricao = req.body.description || req.body.descricao;
    var nova_url_imagem = req.body.img_url || req.body.url_imagem;
    var post_id = req.params.post_id;

    postModel.atualizarPost(novo_titulo, nova_descricao, nova_url_imagem, post_id)
        .then(
            function (result) {
                res.json(result);
            }
        ).catch(
            function (err) {
                console.log(err);
                console.log('Houve um erro ao atualizar o post: ', err.sqlMessage);
                res.json(500).json(err.sqlMessage)
            }
        )
}

module.exports = {
    listarPostagens,
    listarComentarios,
    criarPost,
    atualizarPost,
    comentarPost,
    curtirPost,
    deletarComentario,
    deletarCurtida
};
