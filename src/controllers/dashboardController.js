var dashboardModel = require('../models/dashboardModel');

function getEngagement(req, res) {
    var user_id = req.query.user_id

    dashboardModel.getEngagement(user_id).then((result) => {
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

module.exports = { getEngagement, getCount, getBiggerEngagement, getLikesPerMonth, getCommentsPerMonth, getAllPostsByUser };