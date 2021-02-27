const jwt = require('jsonwebtoken')
const {config} = require('./../../config')
const User = require('./../models/users.model')

const generateToken = async (params={})=> {
  try {
    const token = await jwt.sign(params, config.SECRET, {
      expiresIn: config.TIMER
    })
    return token
  }
  catch(err) {
    console.log(err.message)
  }
}


exports.loginUser = async (req, res) => {
    try {

      let { email, password } = req.body
    
      let user = await User.findOne({email}).select('+password')
    
      if (!user) throw new Error('User not found!')
  
      if (!await user.isValidPassword(password)) {
        throw new Error('e-mail or password invalid!')
      }

      const token = await generateToken({id: user.id})

      return res.status(200).json({
        status: 'success',
        message: 'logged in',
        token
      })
    }
    catch(err) {
      return res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
}