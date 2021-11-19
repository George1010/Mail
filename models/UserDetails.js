var mongoose = require('mongoose');

var UserDetails = new mongoose.Schema({
  _id : mongoose.ObjectId,
  username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  firstname : {type : String, index :true},
  lastname: {type : String , index:true},
  phone:String,
  contacts : []

}, {timestamps: true});

module.exports.UserDetails = mongoose.model('UserDetails', UserDetails);
