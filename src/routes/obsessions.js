var express = require('express');
var router = express.Router();
var upload = require('../config/configUpload')
var obsessionController = require('../controllers/obsessionController');

router.get('/:user_id', function (req, res) {
    obsessionController.get(req, res);
})

router.put('/:user_id', upload.fields([
    { name: 'img_favorite_anime', maxCount: 1 },
    { name: 'img_watching_now', maxCount: 1 },
    { name: 'img_favorite_character', maxCount: 1 }
]), function (req, res) {
    obsessionController.update(req, res);
});

module.exports = router