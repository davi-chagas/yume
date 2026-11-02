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
    var img_favorite_anime = req.body.img_favorite_anime;
    var wathing_now = req.body.wathing_now;
    var img_wathing_now = req.body.img_wathing_now;
    var favorite_character = req.body.favorite_character;
    var img_favorite_character = req.body.img_favorite_character;

    obsessionModel.updateObsession(favorite_anime, img_favorite_anime, wathing_now, img_wathing_now, favorite_character, img_favorite_character)
        .then(
            function (result) {
                res.json(result)
            }
        ).catch(
            function (err) {
                console.log(err);
                console.log('Houve um erro ao atualizar as obsessões: ', err.sqlMessage);
                res.json(500).json(err.sqlMessage);
            }
        )
}

module.exports = { get, update };