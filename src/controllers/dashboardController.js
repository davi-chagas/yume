var dashboardModel = require('../models/dashboardModel');

function getEngagement(req, res) {
    var user_id = req.query.user_id

    dashboardModel.engagement(user_id).then((result) => {
        res.json(result)
    })
};

function getCount(req, res) {
    var user_id = req.query.user_id;

    dashboardModel.getCountPost(user_id).then((result) => {
        res.json(result);
    })
}

function getBiggerEngagement(req, res) {
    var user_id = req.query.user_id;

    dashboardModel.biggerEngagement(user_id).then((result) => {
        res.json(result)
    })
};

function getLikesPerMonth(req, res) {
    var user_id = req.query.user_id;

    dashboardModel.likePerMonth(user_id).then((result) => {
        res.json(result)
    })
}

function getCommentsPerMonth(req, res) {
    var user_id = req.query.user_id;

    dashboardModel.commentsPerMonth(user_id).then((result) => {
        res.json(result)
    })
}

function getAllPostsByUser(req, res) {
    var user_id = req.query.user_id;

    dashboardModel.allPostsByUser(user_id).then((result) => {
        res.json(result)
    })
}

function deletePost(req, res) {
    var post_id = req.params.post_id;
    var user_id = req.query.user_id;

    dashboardModel.deletePost(post_id, user_id)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err.sqlMessage);
        });
}

module.exports = { getEngagement, getCount, deletePost, getBiggerEngagement, getLikesPerMonth, getCommentsPerMonth, getAllPostsByUser };