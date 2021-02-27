const jwt = require('jsonwebtoken')
const {config} = require('./../../config')


const verifyToken = async (token)=> {
  return await jwt.verify(token, config.SECRET)
}

exports.authUser = async (req, res, next) => {
  try {
    const headerAuth = req.headers['authorization']
    const token = headerAuth && headerAuth.split(' ')[1]
  
    if (!token) throw new Error('Must have a token to access!')

    const decode = await verifyToken(token)
    req.user = decode

    next()

  }
  catch(err) {
    return res.status(401).json({
      status: 'fail',
      message: err.message
    })
  }
}