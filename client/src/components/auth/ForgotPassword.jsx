

import React, { useState } from 'react';
import { forgotPassword } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate =useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword(email)
      console.log(res)
      if(res.success){
        toast.success('Password reset link sent! Check your email.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
      });
      navigate('/signin')
      } else{
        toast.error('Oops! Something went wrong. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
      });
      } 
      setEmail('')
    } catch (error) {
      toast.error('Oops! Something went wrong. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
    } 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Send Reset Link
        </button>
      </form>
     
    </div>
  );
};

export default ForgotPassword;
