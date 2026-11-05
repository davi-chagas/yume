
var express = require('express');
var router = express.Router();
var upload = require('../config/configUpload');

var postController = require('../controllers/postController');

router.get('/', function (req, res) {
    postController.getAll(req, res);
});
router.get('/comments', function (req, res) {
    postController.getAllComments(req, res);
});

router.post('/', upload.single('imagem'), function (req, res) {
    postController.createPost(req, res);
});

router.post('/like', function (req, res) {
    postController.likePost(req, res);
});

router.post('/comment', function (req, res) {
    postController.commentPost(req, res);
});

router.put('/:post_id', function (req, res) {
    postController.updatePost(req, res);
});

router.delete('/comment/:comment_id/:user_id', function (req, res) {
    postController.deleteComment(req, res);
});

router.delete('/like/:post_id/:user_id', function (req, res) {
    postController.deleteLike(req, res);
});

router.delete('/:post_id', function (req, res) {
    postController.deletePost(req, res);
});

module.exports = router;
