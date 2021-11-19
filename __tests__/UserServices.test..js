
var userServices = require('../services/UserServices.js')

describe("user services tests", () => {
 test('testing tokenizer', () => {

   var result = userServices.nameAsSearchTokens("test", "")
   expect(result).toBe(["t","te","tes","test"]);
 });
})