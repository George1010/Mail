var express = require('express');
var router = express.Router();
var user = require('../services/UserServices.js')
// Home page route.


router.get('/', function (req, res) {
    var request = req.body;
    var response = user.login(request);
    res.send(response);
})



module.exports = router;