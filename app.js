const express = require('express')
const app = express()
const userRouter = require('./src/routes/users.router')

app.use(express.json())

app.use(`${process.env.BASE_URL}/usuarios`, userRouter)


module.exports = app