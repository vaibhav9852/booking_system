

import React, { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import BookingContext from '../../context/booking/bookingContext';
import { createBooking } from '../../services/bookingService';


const CheckoutForm = ({ clientSecret, dpmCheckerLink }) => {
  const [loading, setLoading] = useState(false);  // To manage loading state during payment processing
  const [errorMessage, setErrorMessage] = useState('');  // To store error messages (if any)
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
   
  // Handle the form submission
  const authCtx = useContext(AuthContext)
  const bookingCtx = useContext(BookingContext)

  const data = {paymentId:bookingCtx.paymentId,userId:authCtx.user?._id,hotelId:bookingCtx.hotel?._id,adult:bookingCtx.guest?.adult,children:bookingCtx.guest?.children,checkin:bookingCtx.date?.startFormat,checkout:bookingCtx.date?.endFormat,totalAmount:bookingCtx.totalAmount}     
  console.log('bboking data',data)     
  // paymentId,userId,hotelId,adult,children,checkin,checkout,totalAmount})                                                                                                                 


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Check if Stripe.js and Elements are loaded
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // Get the CardElement from Stripe
    const cardElement = elements.getElement(CardElement);

    // Call Stripe's API to confirm the payment
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        // Handle errors from Stripe
        setErrorMessage(error.message);
        console.error('Payment failed:', error.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Payment was successful, redirect to the "complete" page
    
        const booking = await createBooking(data)
        console.log('after create booking',booking) 
        console.log('Payment successful:', paymentIntent);
        navigate('/complete');
      }
    } catch (error) {
      console.error('Error during payment processing:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Complete Your Payment</h2>

        {/* Show error message if any */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="card-element" className="block text-lg font-medium text-gray-700 mb-2">
              Card Details
            </label>
            <div className="p-3 border rounded-md border-gray-300">
              {/* Stripe CardElement */}
              <CardElement id="card-element" options={{ hidePostalCode: true }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !stripe || !elements}
            className={`w-full py-3 bg-green-600 text-white font-semibold rounded-md text-lg transition-all duration-300 hover:bg-green-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
