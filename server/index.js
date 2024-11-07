const express = require('express')
const cors    = require('cors')
const {rateLimit} = require('express-rate-limit')
require('dotenv').config()
const connectToDB = require('./config/db')
const userRoute = require('./routes/user.route.js')
const hotelRoute = require('./routes/hotel.route.js')
const paymentRoute = require('./routes/payment.route.js')
const bookingRoute = require('./routes/booking.route.js')

const PORT = process.env.PORT || 8002
const app = express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter) 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/v1/user',userRoute)
app.use('/v1/hotels',hotelRoute)
app.use('/v1/payment',paymentRoute)
app.use('/v1/bookings',bookingRoute) 



 connectToDB();

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})

