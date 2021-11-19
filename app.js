const express = require('express')
const database = require('./Services/DatabaseConnection.js')

const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 3000
const home = require('./routes/home.js');
const user = require('./routes/user.js');
const contact = require('./routes/contact.js')

app.use('/', home);
app.use('/user', user)
app.use('/v1/contact', contact)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})