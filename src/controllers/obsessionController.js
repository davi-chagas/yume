var obsessionModel = require('../models/obsessionModel')

function get(req, res) {
    obsessionModel.getAll(req.params.user_id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(err => res.status(500).send(err))
}

function update(req, res) {
    var favorite_anime = req.body.favorite_anime;
    var watching_now = req.body.watching_now;
    var favorite_character = req.body.favorite_character;

    var files = req.files || {};

    var img_favorite_anime = files.img_favorite_anime
        ? `/assets/${files.img_favorite_anime[0].filename}`
        : null;

    var img_watching_now = files.img_watching_now
        ? `/assets/${files.img_watching_now[0].filename}`
        : null;

    var img_favorite_character = files.img_favorite_character
        ? `/assets/${files.img_favorite_character[0].filename}`
        : null;

    var user_id = req.params.user_id;

    obsessionModel.updateObsession(favorite_anime,
        img_favorite_anime,
        watching_now,
        img_watching_now,
        favorite_character,
        img_favorite_character,
        user_id)
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

module.exports = { get, update };