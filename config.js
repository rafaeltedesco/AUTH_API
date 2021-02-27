require('dotenv').config()

exports.config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  BASE_URL: process.env.BASE_URL,
  SECRET: process.env.SECRET,
  TIMER: process.env.TIMER
}