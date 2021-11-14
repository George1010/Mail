const {db, UserSchema} = require('../models/UserModel.js')
var user = {
 login : (data)=>{
    console.log( data["email"])
    let password = data["password"]
    UserSchema.findOne({email: data["email"]}).exec(function(error, user) {
      console.log(user)
      if (error) {
        console.log(error)
      } else if (!user) {
        console.log("No user found")
      } else {
        user.comparePassword(password, function(matchError, isMatch) {
          if (matchError) {
             console.log("Error")
          } else if (!isMatch) {
             console.log("Error")
          } else {
             console.log("Loggef in")
          }
        })
      }
    })
    },
 register : (data) =>{
    let newUser = new UserSchema(data);
    newUser.save()
    return data;
 }
 }

module.exports= user