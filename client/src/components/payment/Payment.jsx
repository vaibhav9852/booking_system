


import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import AuthContext from "../../context/auth/AuthContext";
import BookingContext from "../../context/booking/BookingContext";



const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState(""); // To store client secret from the backend
  const [dpmCheckerLink, setDpmCheckerLink] = useState(""); // Optional: if you have additional links or data
  const [loading, setLoading] = useState(true); // To show loading state until data is fetched
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext)
  const bookingCtx = useContext(BookingContext)

  useEffect(() => {
    // Fetch the payment details (clientSecret) from the backend when the component mounts
    let price = +bookingCtx.hotel?.charge * + bookingCtx.date?.day * (+bookingCtx.guest?.adult + +bookingCtx.guest?.children) + Math.floor(+bookingCtx.hotel?.charge / 7)
    bookingCtx.handleTotalAmount(price)
    console.log('price..',price,authCtx) 
    if(bookingCtx.date?.day && (bookingCtx.guest?.adult || bookingCtx.guest?.children) ){
    fetch("http://localhost:8005/v1/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hotelId: bookingCtx.hotel?._id || 1, userId: authCtx.user?.userId || 2, totalAmount:price || 200 }), // Example data
    })
      .then((res) => res.json()) 
      .then((data) => { 
        setClientSecret(data.clientSecret);
        setDpmCheckerLink(data.dpmCheckerLink); // Example if you're passing additional info
        setLoading(false); // Once the data is received, stop the loading state
        bookingCtx.handlePaymentId(data.paymentId) 
        bookingCtx.handleGuest({adult:0,children:0})
        bookingCtx.handleDay({day:0,startFormat:new Date(),endFormat:new Date()})
  
      })
      .catch((err) => {
        console.error("Error fetching payment data:", err);
        setLoading(false);
      });
    }else{
      toast.error('Please add date and guests', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
    setLoading(false)
    }
 
  }, []); // Empty dependency array ensures this runs once after mount

  if (loading) {
    return <div>Loading...</div>; // Show a loading state until the clientSecret is fetched
  }

  return (
    <div>
      {/* This can be conditionally rendered once the clientSecret is available */}
      {clientSecret && (
        <CheckoutForm dpmCheckerLink={dpmCheckerLink} clientSecret={clientSecret} />
        
      )}
    </div>
  );
};

export default PaymentPage;

