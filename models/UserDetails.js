var mongoose = require('mongoose');

var UserDetails = new mongoose.Schema({
  _id : mongoose.ObjectId,
  firstname : {type : String, index :true},
  lastname: {type : String , index:true},
  phone:String,
  contacts : []

}, {timestamps: true});

module.exports.UserDetails = mongoose.model('UserDetails', UserDetails);
