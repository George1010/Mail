var mongoose = require('mongoose');


var Group = new mongoose.Schema({
  groupId : String,
  groupName : String,
  contact : Boolean,
  members : [],
  message : [],
  total_messages : Number


}, {timestamps: true});

module.exports.Group = mongoose.model('Group', Group);
