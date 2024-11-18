


import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmail } from '../../services/authService';
import { toast } from 'react-toastify';
import AuthContext from '../../context/auth/AuthContext';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const data = await  verifyEmail(token)
    if(data.success){
        authCtx.signIn(data.data)
        localStorage.setItem('user', JSON.stringify(data.data))
        localStorage.setItem('token', JSON.stringify(data.token))
      toast.success('Email verified successfully', { 
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
       navigate('/')
    }else{
      toast.error(' Something went wrong while verify email. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
    }
    } catch (error) {
      toast.error('Something went wrong while verify email. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
    }
  };

  return (
    <div className="flex justify-center  mt-10">
    <button
      type="submit"
      onClick={handleSubmit}
      className="w-64 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
    >
      Verify Email
    </button>
  </div>
  );
};

export default VerifyEmail;
