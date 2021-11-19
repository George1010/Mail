var express = require('express');
var contact = require('../services/ContactServices.js')
var router = express.Router();

router.get('/:userId', function (req, res) {
    var userId = req.params.userId;
    (async () => {
      var result =  await contact.getContacts(userId)
      if (result != null) res.status(result["code"])
      else res.status(500)
      res.send(result);
    })()
})

router.post('/', function (req, res) {
    var request = req.body;
    console.log(request)
    var userId = request["userId"];
    (async () => {
      var result =  await contact.addContact(request, userId)
      if (result != null) res.status(result["code"])
      else res.status(500)
      res.send(result);
    })()
})

router.get('/search/:query', function (req, res) {
    var request = req.params.query;
    (async () => {
      var result =  await contact.searchContact(request)
      if (result != null) res.status(result["code"])
      else res.status(500)
      res.send(result);
    })()
})


module.exports = router
