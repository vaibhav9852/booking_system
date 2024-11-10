const express = require('express')
const cors    = require('cors')
const {rateLimit} = require('express-rate-limit')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectToDB = require('./config/db')
const userRoute = require('./routes/user.route.js')
const hotelRoute = require('./routes/hotel.route.js')
const paymentRoute = require('./routes/payment.route.js')
const bookingRoute = require('./routes/booking.route.js')
const authRoute = require('./routes/auth.route.js')

const PORT = process.env.PORT || 8002
const app = express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 

})

// Apply the rate limiting middleware to all requests.
app.use(limiter) 
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/v1/user',userRoute)
app.use('/v1/hotels',hotelRoute)
app.use('/v1/payment',paymentRoute)
app.use('/v1/bookings',bookingRoute) 
app.use('/v1/auth',authRoute) 

 connectToDB();

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})

