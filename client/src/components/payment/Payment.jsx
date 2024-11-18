


import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import AuthContext from "../../context/auth/AuthContext";
import BookingContext from "../../context/booking/BookingContext";
import { API_BASE_URL } from "../../config";


const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState(""); 
  const [dpmCheckerLink, setDpmCheckerLink] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext)
  const bookingCtx = useContext(BookingContext)
  const token = JSON.parse(localStorage.getItem('token'))
  console.log('bookingCtx in payment',bookingCtx) 
  useEffect(() => {

    let price = +bookingCtx.hotel?.charge * + bookingCtx.date?.day * (+bookingCtx.guest?.adult + +bookingCtx.guest?.children) + Math.floor(+bookingCtx.hotel?.charge / 7)
    bookingCtx.handleTotalAmount(price)
    if(bookingCtx.date?.day && (bookingCtx.guest?.adult || bookingCtx.guest?.children) ){
      // http://localhost:8005/v1/payment
    fetch(`${API_BASE_URL}/payment`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" ,
            
                   'authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({ hotelId: bookingCtx.hotel?._id || 1, userId: authCtx.user?.userId || 2, totalAmount:price || 200 }), // Example data
    })
      .then((res) => res.json()) 
      .then((data) => { 
        setClientSecret(data.clientSecret);
        setDpmCheckerLink(data.dpmCheckerLink);
        setLoading(false); 
        bookingCtx.handlePaymentId(data.paymentId) 
        // bookingCtx.handleGuest({adult:0,children:0})
        // bookingCtx.handleDay({day:0,startFormat:new Date(),endFormat:new Date()})
  
      })
      .catch((err) => {
        
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
 
  }, []); 

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>; 
  }

  return (
    <div>
  
      {clientSecret && (
        <CheckoutForm dpmCheckerLink={dpmCheckerLink} clientSecret={clientSecret} />
        
      )}
    </div>
  );
};

export default PaymentPage;

