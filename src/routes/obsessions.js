var express = require('express');
var router = express.Router();
var upload = require('../config/configUpload')
var obsessionControler = require('../controllers/obsessionController');

router.get('/:user_id', function (req, res) {
    obsessionControler.get(req, res);
})

router.put('/:user_id', upload.single('imagem'), function (req, res) {
    obsessionControler.update(req, res)
})

module.exports = router