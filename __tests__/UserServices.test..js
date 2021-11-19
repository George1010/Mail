
var userServices = require('../services/UserServices.js')

describe("user services tests", () => {
 test('testing tokenizer', () => {

   var result = userServices.nameAsSearchTokens("test", "")
   console.log(result)
   expect(result).toEqual(["t","te","tes","test"]);
 });
})