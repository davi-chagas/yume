var express = require('express');
var router = express.Router();

var dashboardController = require('../controllers/dashboardController')

router.get('/engagement', function (req, res) {
    dashboardController.getEngagement(req, res)
});

router.get('/count-posts', function (req, res) {
    dashboardController.getCount(req, res)
});

router.get('/bigger-engagement', function (req, res) {
    dashboardController.getBiggerEngagement(req, res);
})

router.get('/likes', function (req, res) {
    dashboardController.getLikesPerMonth(req, res);
})

router.get('/comments', function (req, res) {
    dashboardController.getCommentsPerMonth(req, res);
})

router.get('/', function (req, res) {
    dashboardController.getAllPostsByUser(req, res);
})

router.delete('/:post_id', function (req, res) {
    dashboardController.deletePost(req, res);
})

module.exports = router ;