var mongoose = require('mongoose');


var Search = new mongoose.Schema({
  contactId :String,
  firstname : {type : String, index :true},
  lastname: {type : String , index:true},
  names : []
})

module.exports.Search = mongoose.model('Search', Search);
