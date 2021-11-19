
var contactServices = require('../services/ContactServices.js')

describe("contact service tests", () => {
 test('testing search contact', () => {

   var result = contactServices.searchContact("test")
   console.log(result)
   expect(result).to.not.be.null;
 });
})