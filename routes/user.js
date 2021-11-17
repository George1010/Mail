var express = require('express');
var router = express.Router();
var user = require('../services/UserServices.js')

router.post('/', function (req, res) {
    var request = req.body;
    (async () => {
      var result =  await user.login(request)
      if (result != null) res.status(result["code"])
      else res.status(500)
      res.send(result);
    })()
})



module.exports = router;