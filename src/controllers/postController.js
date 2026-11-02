var postModel = require('../models/postModel')

function getAll(req, res) {
    postModel.getAll().then((result) => {
        res.status(200).json(result);
    })
}

function createPost(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var user_id = req.body.user_id;
    var img_url = req.file ? `/assets/${req.file.filename}` : null; // se tiver img envia para assets/ caso nao retorna como null

    if (title == undefined) {
        res.status(400).send('Titulo indefinido')
    } else if (user_id == undefined) {
        res.status(400).send('Usuário indefinido')
    } else {
        postModel.createPost(title, description, user_id, img_url).
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

function updatePost(req, res) {
    var new_title = req.body.title;
    var new_description = req.body.description;
    var new_img_url = req.body.img_url;
    var post_id = req.params.post_id;

    postModel.update(new_title, new_description, new_img_url, post_id)
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

function deletePost(req, res) {
    var post_id = req.params.post_id;

    postModel.deletePost(post_id)
        .then(
            function (result) {
                res.json(result)
            }
        ).catch(
            function (err) {
                console.log(err);
                console.log('Houve um erro ao deletar o post: ', err.sqlMessage);
                res.json(500).json(err.sqlMessage);
            }
        )
}

module.exports = { getAll, createPost, updatePost, deletePost };