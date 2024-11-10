const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user.model.js')

// create user

exports.createUser = async (req,res) =>{
  const {name,email,password,role} = req.body 
  if(!name || !email || !password){
     res.status(400).json({success:false,messgae:'name,email and password  required'})
  }else{
     try{
           let isExistUser = await User.find({email})
           if(!isExistUser){
            res.status(400).json({success:false,messgae:'User already exist'})
           }else{
              let {SALT_ROUND} = process.env;
              let hashPassword = await bcrypt.hash(password,+SALT_ROUND)
              let user = await User.create({name,email,password:hashPassword,role:role})
              const {SECRET_KEY} = process.env
              function createJWT(payload){
             return jwt.sign({payload},SECRET_KEY)
              }
              let validUser = await User.findOne({email}).select('-password')
             // return res.status(200).json({success:true,user:validUser,token: createJWT(user.email)})                            
            res.status(201).json({success:true,messgae:'User created',user:validUser,token: createJWT(user.email)})          // data:user.role                                    
           }
     }catch(err){
        res.status(500).json({success:false,messgae:'Internal server error'})
     }
  }
}

// login user 
exports.loginUser = async (req,res) =>{
    const {email,password} = req.body
    if(!email || !password){
    return res.status(400).json({success:false,messgae:'Email and Password required'})
    }else{
        try{
          let user = await User.findOne({email})
          if(!user){
            return res.status(401).json({success:false,messgae:'User not exist'})
          }else{
             let isValidPassword = await bcrypt.compare(password,user.password)
             if(!isValidPassword){
                return res.status(401).json({success:false,messgae:'Password does not match'})
             }else{
                const {SECRET_KEY} = process.env
                 function createJWT(payload){
                return jwt.sign({payload},SECRET_KEY)
                }
                let validUser = await User.findOne({email}).select('-password')
                return res.status(200).json({success:true,user:validUser,token: createJWT(user.email)})
             }
          }
        }catch(err){
         res.status(500).json({success:false,messgae:'Internal server error'})
        }
    }
} 

// logout 

exports.updateUser = async (req,res) => {
   const {id} = req.params
   const {name,email,password} = req.body 
   console.log('id..put',id)

   try{
      let {SALT_ROUND} = process.env;
      let hashPassword = await bcrypt.hash(password,+SALT_ROUND)
      let response = await User.findByIdAndUpdate(id,{name,email,password:hashPassword})
      let validUser = await User.findById(id).select('-password')
      return res.status(200).json({success:true,user:validUser})
   }catch(err){
      res.status(500).json({success:false,messgae:'Internal server error'})
   }
}

// get users 

exports.getUsers = async (req,res) =>{
   try{
    let users = await User.find()
    res.status(200).json({success:false,users})
   }catch(err){
      res.status(500).json({success:false,message:'Internal server error while get users'})
   }
}

// delete user 
exports.deleteUser = async (req,res) =>{
 const {id} = req.params 

 try{
 let user = await User.findByIdAndDelete(id)

 res.status(200).json({success:true,message:'user deleted',user})
 }catch(err){
   console.log('user delete erroe',err)
   res.status(500).json({success:false,message:'Internal server error while delete user'})
 }
}


