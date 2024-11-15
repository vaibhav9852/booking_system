const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')



exports.authenticate = async (req,res,next) =>{
    let token = req.headers['authorization']?.split(' ')[1] || req.headers['authorization']
    console.log('head token',token) 
    if(!token){
      res.status(403).json({success:false,message:'Token is required'}) 
    }else{
    try{
        const {JWT_SECRET} = process.env 
      let payload = await  jwt.verify(token,JWT_SECRET)
      let user = await User.findOne({email:payload.email})
      req.user = user
      next();
    }catch(err){
        res.status(500).json({success:false,message:'Internal server error while authenticate'})
    }
  
}
 
// console.log('mid token 2',req.cookies)

// const token = req.cookies.sessionToken;
// console.log('mid token',token)

// if (!token) {
//   return res.status(401).json({ message: 'Authentication required' });
// }

// try {
//   const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//  let user = await User.findOne({email:decoded.email})
//   req.user = user ;
//   next();
// } catch (error) {
//   res.status(401).json({ message: 'Invalid or expired token' });
// }
}


exports.admin = async (req,res,next) =>{
    try{
      if(req?.user?.role == 'admin'){
        next();
      }else{
        res.status(403).json({success:false,message:'admin role required'})
      }
    }catch(err){
      res.status(500).json({success:false,message:'Internal server error while admin check'})
    } 
}




