const Booking = require("../models/booking.model")


exports.createBooking = async (req,res) =>{
  const {paymentId,userId,hotelId,adult,children,checkin,checkout,totalAmount} = req.body

  console.log('booking route',{paymentId,userId,hotelId,adult,children,checkin,checkout})
    try{
    let booking = await Booking.create({paymentId,userId,hotelId,adult,children,checkin,checkout,totalAmount})
      res.status(201).json({success:true,message:'Booking successful'})
    }catch(err){

        return res.status(500).json({success:false,message:'Internal server error'})
    }
}

exports.getBookings = async (req,res) =>{
     const {userId} = req.params 
    console.log('userId ...',userId)
      try{
      let booking = await Booking.find({userId})
      console.log('booking--',booking) 
        res.status(200).json({success:true,message:'Booking successful',data:booking})
      }catch(err){
  
          return res.status(500).json({success:false,message:'Internal server error'})
      }
  }




