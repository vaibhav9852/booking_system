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

exports.getBooking = async (req,res) =>{
     const {id} = req.params 
    console.log('userId at getBookings ...',id) 
      try{
      let booking = await Booking.find({userId:id})
      console.log('booking--',booking) 
        res.status(200).json({success:true,data:booking})
      }catch(err){
          return res.status(500).json({success:false,message:'Internal server error'})
      }
  }

  exports.getBookings = async (req,res) =>{
     try{
     let bookings = await Booking.find()
       res.status(200).json({success:true,data:bookings})
     }catch(err){
         return res.status(500).json({success:false,message:'Internal server error'})
     }
 }


exports.deleteBooking = async (req,res) =>{
   let {id} = req.params
   try{
   let booking = await Booking.findByIdAndDelete(id)
   res.status(200).json({success:true,booking})
   }catch(err){
    res.status(500).json({success:false,message:'Internal server error while delete booking'})
   }
}







