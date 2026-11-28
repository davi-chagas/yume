var obsessionModel = require('../models/obsessionModel')

function listarObsessoes(req, res) {
    var usuario_id = req.params.user_id || req.params.usuario_id;
    obsessionModel.listarObsessoes(usuario_id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(err => res.status(500).send(err))
}

function atualizarObsessoes(req, res) {
    var anime_favorito = req.body.favorite_anime || req.body.anime_favorito;
    var assistindo_agora = req.body.watching_now || req.body.assistindo_agora;
    var personagem_favorito = req.body.favorite_character || req.body.personagem_favorito;

    var files = req.files || {};

    var url_imagem_anime_favorito = files.img_favorite_anime
        ? `/assets/${files.img_favorite_anime[0].filename}`
        : null;

    var url_imagem_assistindo_agora = files.img_watching_now
        ? `/assets/${files.img_watching_now[0].filename}`
        : null;

    var url_imagem_personagem_favorito = files.img_favorite_character
        ? `/assets/${files.img_favorite_character[0].filename}`
        : null;

    var usuario_id = req.params.user_id || req.params.usuario_id;

    obsessionModel.atualizarObsessoes(anime_favorito,
        url_imagem_anime_favorito,
        assistindo_agora,
        url_imagem_assistindo_agora,
        personagem_favorito,
        url_imagem_personagem_favorito,
        usuario_id)
        .then(
            function (result) {
                res.json(result)
            }
        ).catch(
            function (err) {
                console.log(err);
                console.log('Houve um erro ao atualizar as obsessões: ', err.sqlMessage);
                res.status(500).json(err.sqlMessage);
            }
        )
}

module.exports = { listarObsessoes, atualizarObsessoes };
