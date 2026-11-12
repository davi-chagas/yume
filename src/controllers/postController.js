var postModel = require('../models/postModel');

function getAll(req, res) {
    var user_id = req.query.user_id;

    postModel.getAll(user_id).then((result) => {
        res.status(200).json(result);
    });
}

function getAllComments(req, res) {
    postModel.getComments().then((result) => {
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

function likePost(req, res) {
    var user_id = req.body.user_id;
    var post_id = req.body.post_id;

    postModel.likePost(user_id, post_id)
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

function commentPost(req, res) {
    var user_id = req.body.user_id;
    var post_id = req.body.post_id;
    var content = req.body.content;

    postModel.commentPost(user_id, post_id, content)
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

function deleteComment(req, res) {
    var post_id = req.params.post_id;
    var user_id = req.params.user_id;

    postModel.deleteCommentPost(user_id, post_id)
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

function deleteLike(req, res) {
    var post_id = req.params.post_id;
    var user_id = req.params.user_id;

    postModel.deleteLikePost(post_id, user_id)
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

module.exports = { getAll, getAllComments, createPost, updatePost, commentPost, likePost, deleteComment, deleteLike };