const express = require('express')
const database = require('./Services/DatabaseConnection.js')

const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 3000
const home = require('./routes/home.js');
const send = require('./routes/sendMail.js');
const login = require('./routes/login.js');
const register = require('./routes/register.js');

app.use('/', home);
app.use('/send', send);
app.use('/user/login', login);
app.use('/user/register', register);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})