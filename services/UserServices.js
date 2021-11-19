const {db, UserSchema} = require('../models/UserModel.js')
const {UserDetails} = require('../models/UserDetails.js')
const {Search} = require('../models/Search.js')

var bcrypt = require('bcryptjs');

      module.exports.login= async (data)=>{
        let email = data["email"]
        let password = data["password"]
        var obj = await validateLogin(email, password)
        return obj
     }
      module.exports.register = async (data) =>{

        var registerData = {"email":data["email"], "password":data["password"]}
        let newUser = new UserSchema(registerData);
        let password = data["password"]
        let email = data["email"]
        var user = await findOneByEmail(email)
        if(user ==null || user.length==0) {
            newUser.save( function (err) {
            var id = newUser._id
            var userInfo = {"_id": id, "firstname":data["firstname"], "lastname":data["lastname"], "username":data["username"], "phone":data["phone"]}
            let userData = new UserDetails(userInfo);
            userData.save()
            var names = nameAsSearchTokens(data["firstname"], data["lastname"])
            var searchObj = {"names":names, "contactId":id, "firstname" :data["firstname"], "lastname":data["lastname"] }
            var searchData = new Search(searchObj)
            searchData.save()
            })
            return {"success":true, "message":"User registration successful", "code":200}
        }else {
            return {"success":false, "error":"User registration unsuccessful", "code":400}
        }
     }

     var validateLogin = async (email, password)=>{
        var userData = await UserSchema.findOne({email: email})
        if(userData ==null || userData.length==0) {
            return {"success":false, "error":"user not found", "code":400}
        }else {
            const validPassword = await bcrypt.compare(password, userData.password);
            if (validPassword) {
                return {"success":true, "message":"logged in successfully", "code":200}
            } else {
                return {"success":false, "error":"invalid password", "code":400}
            }
        }

     }

     var findOneByEmail= async (email)=>{
        var userData = await UserSchema.findOne({email: email})
        return userData
     }

     var nameAsSearchTokens = (firstname, lastname) =>{

        var name = (firstname+lastname).replace(" ","").toUpperCase()
        var length = name.length
        name = name.split("")
        console.log(name)
        var nameAsToken = []
        let i=0
        var a= ""
        while(i<length) {

            a =a+ name[i]
            nameAsToken.push(a)
            i=i+1
        }
        console.log(nameAsToken)
        return nameAsToken
     }




