const express = require('express')
const userController = require('./../controllers/users.controller.js')
const userAuthController = require('./../controllers/usersAuth.controller')
const authMiddleware = require('./../middlewares/authUser.middleware')

const router = express.Router()


router.route('/login')
.post(userAuthController.loginUser)

router.route('*')
.all(authMiddleware.authUser)

router.route('/')
.get(userController.getAll)
.post(userController.createNewUser)


router.route('/:id')
.get(userController.getUserById)
.put(userController.updateUserById)
.delete(userController.deleteUserById)


module.exports = router