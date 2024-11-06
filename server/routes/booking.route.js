
const express = require('express')
const { createBooking, getBookings } = require('../controllers/booking.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router()

//  authenticate  
router.post('/',  createBooking)

router.get('/', getBookings)

module.exports = router ;