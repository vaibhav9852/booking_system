const express = require('express')
const {createUser,loginUser, updateUser, deleteUser, getUsers, verifyEmail, logout} = require('../controllers/user.controller.js')

const { authenticate, admin } = require('../middlewares/auth.middleware.js')

const router = express.Router() 

router.post('/signup',createUser)

router.post('/verify-email/:token',verifyEmail)

router.post('/signin',loginUser)

router.post('/logout',logout) 

router.put('/:id',updateUser) 

router.get('/',authenticate, admin, getUsers)  // authenticate 

router.delete('/:id',deleteUser)  

module.exports = router  

