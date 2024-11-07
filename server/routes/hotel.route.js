const express = require('express')
const multer = require('multer')
const { addHotel,getHotels , getHotel, deleteHotel, updateHotel } = require('../controllers/hotel.controller')
const { admin,authenticate  } = require('../middlewares/auth.middleware')

const router = express.Router()
const upload = multer({dest:'uploads/'})

router.post('/',authenticate,admin,upload.array('photos'),addHotel)

router.get('/',getHotels) 

router.get('/:id',getHotel) 

router.put('/:id',updateHotel)

router.delete('/:id',deleteHotel)





module.exports = router  

