const express = require('express')
const cors    = require('cors')
const {rateLimit} = require('express-rate-limit')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const cron = require('node-cron')
const connectToDB = require('./config/db')
const {sendMailFromHotel} = require('./utils/sendAutoMail.js')
const userRoute = require('./routes/user.route.js')
const hotelRoute = require('./routes/hotel.route.js')
const paymentRoute = require('./routes/payment.route.js')
const bookingRoute = require('./routes/booking.route.js')
const authRoute = require('./routes/auth.route.js')
const { updateHotelAvailable } = require('./utils/updateHotelAvailable.js')

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
app.options('*', cors());  // Allow preflight requests for all routes

app.use(cors({
	origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/v1/user',userRoute)
app.use('/v1/hotels',hotelRoute)
app.use('/v1/payment',paymentRoute)
app.use('/v1/bookings',bookingRoute) 
app.use('/v1/auth',authRoute) 

 connectToDB();


//  cron.schedule('0 1 * * *', () => {  // 0 1 * * * 
// 	sendMailFromHotel()  // Running a job at 01:00 at America/Sao_Paulo timezone
//      updateHotelAvailable() // 
//   }, {  
// 	scheduled: true,
// 	timezone: "America/Sao_Paulo" 
//   }); 



app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})

// make responsive hotel and hotel details page 
// 


