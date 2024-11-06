const mongoose = require('mongoose')
const {Schema} = require('mongoose')

  const userSchema = new Schema( {
    name :{
      type : String,
      required : true,
      lowercase : true,
      trim : true,
      index : true
    },
    email:{
        type : String,
      required : true,
      lowercase : true,
      trim : true,
      index : true
    },
    password:{
        type : String,
        required : true,
        trim : true,
    },
    role:{
      type : String,
      default : 'user'
    }

  })

  const User = mongoose.model('User',userSchema)

  module.exports = User;


