const {catchAsync} = require('./../utils/catchAsync')
const userCrudService = require('./../services/usersCrud.service')

module.exports = {
  getAll: catchAsync(userCrudService.getAllUsers),
  createNewUser: catchAsync(userCrudService.createNewUser),
  deleteUserById: catchAsync(userCrudService.deleteUserById),
  getUserById: catchAsync(userCrudService.getUserById),
  updateUserById: catchAsync(userCrudService.updateUserById)
}