const mongoose = require('mongoose')
const validator = require('email-validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    minlength: 3,
    validate: {
      validator: (name)=> {
        return isNaN(name)
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email)=> {
        return validator.validate(email)
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
    validate: {
      validator: function (password) {
        return password == this.password
      }
    }
  }
},
{
  timestamps: true
})

userSchema.methods.generatePassword = async function(){
  try {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(this.password, salt)
  }  
  catch(err) {
    console.log(err.message)
  }
}

userSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password.toString(), this.password)
  }
  catch(err) {
    console.log(err)
  }
}

userSchema.pre('save', async function() {
  this.password = await this.generatePassword()
  this.confirmPassword = undefined
} )


module.exports = mongoose.model('User', userSchema)