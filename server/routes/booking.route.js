
const express = require('express')
const { createBooking, getBookings, getBooking } = require('../controllers/booking.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router()

//  authenticate  
router.post('/',  createBooking)

router.get('/', getBookings)  

router.get('/:id', getBooking)  

module.exports = router ;  