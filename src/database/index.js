const mongoose = require('mongoose')

exports.dbConnection = async (config)=> {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log(`Connected to db ${conn.connection.name}`)
    return conn

  }
  catch(err) {
    console.log(err.message)
  }
}