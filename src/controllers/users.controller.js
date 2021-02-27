
const User = require('./../models/users.model')

exports.getAll = async (req, res)=> {
  try {
    const users = await User.find()
    if (!users.length) throw new Error('Data not Found in Users')
    return res.status(200).json({
      status:'success',
      message: `${users.length} User(s) founded`,
      userId: req.user.id,
      data: {
        users
      }
    })
  }
  catch(err) {
    return res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }
}


exports.createNewUser = async (req, res)=> {
  try {
    const newUser = await User.create(req.body)
    return res.status(201).json({
      status: 'success',
      message: 'New User created',
      data: {
        newUser
      }
    })

  }  
  catch(err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}


exports.deleteUserById = async (req, res) => {
  try {
    let {id} = req.params
    const { ok, deletedCount } = await User.deleteOne({_id: id})

    if (ok && !deletedCount) throw new Error('User Not Found')

    return res.status(200).json({
      status: 'success',
      message: 'User deleted'
    })

  }
  catch(err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message
    })
    }

}

exports.getUserById = async (req, res) => {
  try {
  
    let {id} = req.params
    const user = await User.findById({_id: id })
    if (!user) throw new Error('User not found!')
    return res.status(200).json( {
      status: 'success',
      message: `User ${user.name} founded!`,
      data: {
        user
      }
    })
  }
  catch(err) {
    return res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }
}


exports.updateUserById = async (req, res)=> {
  try {
    let {id} = req.params
    let user = await User.findOne({_id: id})
    if (!user) throw new Error(`Cannot found user to update`)
    previousUser = {...user}
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user = await user.save()
    console.log(previousUser)
    return res.status(200).json({
      status: 'success',
      message: 'User updated'
    }) 
  }
  catch(err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }

}