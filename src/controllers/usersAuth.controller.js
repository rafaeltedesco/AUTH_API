const {catchAsync} = require('./../utils/catchAsync')
const usersAuthService = require('./../services/usersAuth.service')

exports.loginUser = catchAsync(usersAuthService.loginUser)