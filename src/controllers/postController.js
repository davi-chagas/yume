var postModel = require('../models/postModel')

function getAllPosts(req, res) {
    postModel.getPosts().then((result) => {
        res.status(200).json(result);
    })
}

function getAllQuizes(req, res) {
    postModel.getQuizes().then((result) => {
        res.status(200).json(result)
    })
}

function createPost(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var img_url = req.body.img_url;
    var type = req.body.type;
    var user_id = req.params.user_id;

    if (title == undefined) {
        res.status(400).send('Titulo indefinido')
    } else if (type == undefined) {
        res.status(400).send('Tipo do post indefinido')
    } else if (user_id == undefined) {
        res.status(400).send('Usuário indefinido')
    } else {
        postModel.createPost(title, description, img_url, type, user_id).
        then(function (result) {
            res.json(result)
        })
        .catch(
            function(err){
                console.log(err);
                console.log('Houve um erro ao realizar o post: ' + err.sqlMessage);
                res.status(500).json(err.sqlMessage)
            }
        )
    }
}

module.exports = { getAllPosts, getAllQuizes, createPost };