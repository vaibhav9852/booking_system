const Payment = require("../models/payment.model");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.payment = async (req,res) =>{
     const {userId,hotelId,totalAmount} = req.body
    //  Create a PaymentIntent with the order amount and currency
     console.log('hit pay backend...',userId,hotelId,totalAmount)  
  
     try{
      if(userId && hotelId && totalAmount){
  const paymentIntent = await stripe.paymentIntents.create({
    amount: +`${totalAmount}.00`,
    currency: "INR",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // update hotel - hotel.available - 1
  // update payment table - status:success , paymentId : paymentIntent.id , bookingId 
  // hotel bookingId , 
  let payment = await Payment.create({statue:'complete',userId,hotelId,totalAmount,paymentId:paymentIntent.id})
   console.log('backend payment',paymentIntent.client_secret,paymentIntent.id)
  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    paymentId : payment._id
  });
}else{
  throw new Error('Invalid data')
}
}catch(err){
  res.status(500).json({sucess:false,message:'Internal server error'})
}

}