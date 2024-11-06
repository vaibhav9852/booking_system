const express = require('express')
const multer = require('multer')
const { addHotel,getHotels , getHotel } = require('../controllers/hotel.controller')
const { admin,authenticate  } = require('../middlewares/auth.middleware')

const router = express.Router()
const upload = multer({dest:'uploads/'})

router.post('/',authenticate,admin,upload.array('photos'),addHotel)

router.get('/',getHotels) 

router.get('/:id',getHotel) 





module.exports = router  

