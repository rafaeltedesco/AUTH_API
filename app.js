const express = require('express')
const app = express()
app.use(express.json())
app.use(`${process.env.BASE_URL}/usuarios`, require('./src/routes/users.router'))


module.exports = app