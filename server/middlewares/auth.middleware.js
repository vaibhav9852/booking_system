const jwt = require('jsonwebtoken')
const User = require('../models/user.model')



exports.authenticate = async (req,res,next) =>{
    let token = req.headers['authorization']?.split(' ')[1] || req.headers['authorization']
    if(!token){
      res.status(403).json({success:false,message:'Token is required'})
    }else{
    try{
        const {SECRET_KEY} = process.env
      let payload = await jwt.verify(token,SECRET_KEY)
      console.log('payload',payload)
      let user = await User.findOne({email:payload.payload})
      console.log('user',user)
      req.user = user
      next();
    }catch(err){
        res.status(500).json({success:false,message:'Internal server error while authenticate'})
    }
  
}
}


exports.admin = async (req,res,next) =>{
  console.log('req.user',req.user) 
  console.log('req.user.role',req.user.role) 
    try{
      if(req.user.role == 'admin'){
        next();
      }else{
        res.status(403).json({success:false,message:'admin role required'})
        
      }
    }catch(err){
      res.status(500).json({success:false,message:'Internal server error while admin check'})
    } 
  //  next();   
}




