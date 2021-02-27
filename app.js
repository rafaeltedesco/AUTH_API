const express = require('express')
const app = express()
const AppError = require('./src/utils/appError')
const globalErrorHandler = require('./src/controllers/errorHandler.controller')
const userRouter = require('./src/routes/users.router')

app.use(express.json())

app.use(`${process.env.BASE_URL}/usuarios`, userRouter)


app.all('*', globalErrorHandler)

app.use(new AppError('teste', 404))

module.exports = app