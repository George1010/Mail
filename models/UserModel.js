var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  password: {type : String}
  }, {timestamps: true});

UserSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
}


module.exports.UserSchema = mongoose.model('User', UserSchema);
module.exports.db = mongoose;