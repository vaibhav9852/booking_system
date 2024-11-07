const express = require('express')
const {createUser,loginUser, updateUser, deleteUser, getUsers} = require('../controllers/user.controller.js')
const { model } = require('mongoose')

const router = express.Router()

router.post('/signup',createUser)

router.post('/signin',loginUser)

router.put('/:id',updateUser)

router.get('/',getUsers)

router.delete('/:id',deleteUser) 

module.exports = router