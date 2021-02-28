const User = require('./../models/users.model')

module.exports = {

  getAllUsers: async (req, res, next)=> {
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
  },

  createNewUser: async (req, res, next)=> {
    const newUser = await User.create(req.body)
    return res.status(201).json({
      status: 'success',
      message: 'New User created',
      data: {
        newUser
      }
    })
  },

  deleteUserById: async (req, res, next) => {
    let {id} = req.params
    const { ok, deletedCount } = await User.deleteOne({_id: id})

    if (ok && !deletedCount) throw new Error('User Not Found')

    return res.status(200).json({
      status: 'success',
      message: 'User deleted'
    })
  },

  getUserById: async (req, res, next) => {
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
  },

  updateUserById: async (req, res, next)=> {
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
  },

}  