const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user.model.js')
const sendEmail = require('../utils/sendEmail.js')

// create user

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body
  const FRONTEND_URL = 'http://localhost:5173'
  if (!name || !email || !password) {
    res.status(400).json({ success: false, messgae: 'name,email and password  required' })
  } else {
    try {
      let isExistUser = await User.findOne({ email })

      if (isExistUser) {
        res.status(400).json({ success: false, message: 'User already exist' })
      } else {
        let { SALT_ROUND, JWT_SECRET } = process.env;
        let hashPassword = await bcrypt.hash(password, +SALT_ROUND)
        const genrateToken = (payload, secret, options) => {
          return jwt.sign(payload, secret, options)
        }
        const verificationToken = genrateToken({ email }, JWT_SECRET, { expiresIn: '1h' });

        let user = await User.create({ name, email, password: hashPassword, role: role, verificationToken })

        const origin = req.headers.origin || FRONTEND_URL;
        const verificationUrl = `${origin}/verify-email/${verificationToken}`;


        const message = `Click the following link to verify your email: ${verificationUrl}`;
        try {

          await sendEmail({
            email: email,
            subject: 'Please verify your email address',
            message,
          });
          res.status(200).json({ success: true, message: 'Signup successful. Please check your email for verification link.' });
        } catch (error) {

          return res.status(500).json({ success: false, message: 'Error during signup' })
        }

      }
    } catch (err) {
      console.log('signup err', err)
      res.status(500).json({ success: false, messgae: 'Internal server error' })
    }
  }
}

// verify email
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  const { JWT_SECRET } = process.env
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.verified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    const genrateToken = (payload, secret, options) => {
      return jwt.sign(payload, secret, options)
    }

    const token = genrateToken({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    // const sessionToken = genrateToken({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
   

    // res.cookie('sessionToken', sessionToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    //   maxAge: 60 * 60 * 1000, // 1 hour expiration
    //   sameSite: 'None',
    // });

    res.status(200).json({ success: true, data: { name: user.name, email: user.email, verified: user.verified, role: user.role, userId: user._id },token });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }
};


// login user 
exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  console.log(' email, password', email, password)
  if (!email || !password) {
    return res.status(400).json({ success: false, messgae: 'Email and Password required' })
  } else {
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ success: false, messgae: 'User not exist' })
      } else {
        console.log('comp pass',password, user.password)
        let isValidPassword = await bcrypt.compare(password, user.password)
        console.log('isValidPassword',isValidPassword)
        if (!isValidPassword) {
          return res.status(401).json({ success: false, messgae: 'Password does not match' })
        } else {
          const { JWT_SECRET } = process.env
          const genrateToken = (payload, secret, options) => {
            return jwt.sign(payload, secret, options) 
          }
          const token = genrateToken({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
          //  const sessionToken = genrateToken({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
          // res.cookie('sessionToken', sessionToken, {
          //   httpOnly: true,
          //   secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
          //   maxAge:  60 * 60 * 1000,  // Expires in 1 hour
          //   sameSite: 'None',
          // }); 

          return res.status(200).send({ success: true,  data: { name: user.name, email: user.email, verified: user.verified, role: user.role, userId: user._id }, token })
        } 
      }   
    } catch (err) {
      res.status(500).json({ success: false, messgae: 'Internal server error' })
    }
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body
  console.log('id..put', id)

  try {
    let { SALT_ROUND } = process.env;
    let hashPassword = await bcrypt.hash(password, +SALT_ROUND)
    let response = await User.findByIdAndUpdate(id, { name, email, password: hashPassword })
    let validUser = await User.findById(id).select('-password')
    return res.status(200).json({ success: true, user: validUser })
  } catch (err) {
    res.status(500).json({ success: false, messgae: 'Internal server error' })
  }
}

// get users 

exports.getUsers = async (req, res) => {
  try {
    let users = await User.find()
    res.status(200).json({ success: true, users })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error while get users' })
  }
}

// delete user 
exports.deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    let user = await User.findByIdAndDelete(id)

    res.status(200).json({ success: true, message: 'user deleted', user })
  } catch (err) {
    console.log('user delete erroe', err)
    res.status(500).json({ success: false, message: 'Internal server error while delete user' })
  }
}


exports.logout = (req, res) => {
  // res.clearCookie('sessionToken');
  // res.status(200).json({success:true, message: 'Logged out successfully' });
  
}



