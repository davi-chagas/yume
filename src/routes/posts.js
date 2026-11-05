var express = require('express');
var router = express.Router();
var upload = require('../config/configUpload')

var postController = require('../controllers/postController');

router.get('/', function (req, res) {
    postController.getAll(req, res);
})

router.get('/comments', function (req, res) {
    postController.getAllComments(req, res);
})

router.post('', upload.single('imagem'), function (req, res) {
    postController.createPost(req, res)
})

router.put('/:post_id', function (req, res) {
    postController.updatePost(req, res);
})

router.delete('/:post_id', function (req, res) {
    postController.deletePost(req, res);
})

router.delete('/comment/:post_id', function (req, res) {
    postController.deleteComment(req, res);
})

router.delete('/like/:post_id', function (req, res) {
    postController.deleteLike(req, res);
})

module.exports = router;