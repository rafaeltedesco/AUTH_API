const express = require('express')
const app = express()
const AppError = require('./src/utils/appError')
const globalErrorHandler = require('./src/controllers/error.controller')

const userRouter = require('./src/routes/users.router')


app.use(express.json())
app.use(`${process.env.BASE_URL}/usuarios`, userRouter)


app.all('*', (req, res, next)=> {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404))
})


app.use(globalErrorHandler)


module.exports = app