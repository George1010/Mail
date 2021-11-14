var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://gj10101:george112233@cluster0.sj2lm.mongodb.net/Mail';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db