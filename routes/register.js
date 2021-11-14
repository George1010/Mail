var express = require('express');
var router = express.Router();
var user = require('../services/UserServices.js')


router.get('/', function (req, res) {
    var request = req.body;
    var response = user.register(request);
    res.send(response);
})



module.exports = router;