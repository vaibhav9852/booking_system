import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BookingContext from '../../context/booking/bookingContext';

const CompletePage = () => {
  const bookingCtx = useContext(BookingContext)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-600 text-center mb-6">Thank you for your payment. Your booking has been confirmed.</p>
        
        {/* Booking Summary */}
        {/* {bookingDetails && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Booking Summary</h3>
            <p className="text-gray-700"><strong>Hotel Name:</strong> {bookingCtx.hotel}</p>
            <p className="text-gray-700"><strong>Check-in:</strong> {bookingCtx.date}</p>
            <p className="text-gray-700"><strong>Check-out:</strong> {}</p>
            <p className="text-gray-700"><strong>Total Price:</strong> ${bookingDetails.totalPrice}</p>
          </div>
        )} */}

        {/* Return to Home Link */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-green-700"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompletePage;
