const {Group} = require('../models/Group.js')
const {UserDetails} = require('../models/UserDetails.js')
const { v4 } = require('uuid');

module.exports.addContact= async (data, id)=>{

    let newContactId = data["contactId"]
    var newContactObj=  await findOneById(newContactId)
    var user= await findOneById(id)
    if (user == null || user.length==0) {
        return {"success":false, "code":400, "error":"invalid userId"}
    }
    var groupId = v4()
    var groupData = new Group({"groupId":groupId,"groupName":newContactObj["firstname"]+" "+newContactObj["lastname"],"contact":true, members:[newContactObj["_id"], user["_id"]], "messages":[], "total_messages":0})
    var response = await createNewGroupAndUpdateContact(groupData, user, newContactObj)
    console.log(response)
    return response

}

module.exports.getContacts= async (id)=>{
    var user= await findOneById(id)
    var data=  await findAllContacts(user["contacts"])
    console.log(data)
    if(data == null || data.length==0) {
        return {"success":false, "error":"no contacts found", "code":400}
    } else {
        return {"success":true, "code":200,"data":data}
    }
}

var findOneAndUpdate= async (id, dataToUpdate)=>{
    var userData = await UserDetails.findOneAndUpdate({_id: id}, dataToUpdate)
    return userData
}
var findOneById= async (id)=>{
    var userData = await UserDetails.findOne({"_id": id})
    return userData
}

var findAllContacts = async (contacts)=>{
    var data = await Group.find({"groupId": contacts})
    return data
}
var createNewGroupAndUpdateContact = async (groupData, user, newContactObj) => {
    console.log("in")
    groupData.save()

    var userContacts = user["contacts"]
    var receiverContacts = newContactObj["contacts"]
    if (userContacts == null || !userContacts.includes(newContactObj["_id"])) {
        userContacts.push(groupData["groupId"])
    }
    if (receiverContacts == null || !receiverContacts.includes(user["_id"])) {
        receiverContacts.push(groupData["groupId"])
    }
    var dataToBeUpdated1 = {"contacts" : userContacts}
    var dataToBeUpdated2 = {"contacts" : receiverContacts}
    var updateData1 = await findOneAndUpdate(user["_id"], dataToBeUpdated1)
    var updateData2 = await findOneAndUpdate(newContactObj["_id"], dataToBeUpdated2)
    var response
    if (updateData1 && updateData2) {
        response = {"success" : true, "code" : 200, "data":groupData}
    } else {
        response = {"success" : false, "code" : 400, "error": "error"}
    }
    return response

}