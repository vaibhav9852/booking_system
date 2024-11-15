import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BookingContext from '../../context/booking/BookingContext';


const CompletePage = () => {
  const bookingCtx = useContext(BookingContext)
 
  return (
    <div className='flex justify-center items-center  h-5/6'>
    <div className="flex flex-col items-center justify-center    py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-600 text-center mb-6">Thank you for your payment. Your booking has been confirmed.</p>
        
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
    </div>
  );
};

export default CompletePage;
