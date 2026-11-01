var express = require('express');
var router = express.Router();

var postController = require('../controllers/postController');

router.get('/', function (req, res) {
    postController.getAllPosts(req, res);
})

router.get('/quiz', function (req, res) {
    postController.getAllQuizes(req, res);
})

router.post('/:user_id', function (req, res) {
    postController.createPost(req, res)
})

router.put('/:post_id', function (req, res) {
    postController.updatePost(req, res);
})

router.delete('/:post_id', function (req, res) {
    postController.deletePost(req, res);
})

module.exports = router;