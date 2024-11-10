
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('token,password',token,password)
    try {
      //const res = await axios.put(`/api/auth/reset-password/${token}`, { password });
      const res = await  resetPassword(token,password)
    console.log('reset res',res)
    if(res.success){
      toast.success('Your password has been reset successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
    setPassword('')
       navigate('/signin')
    }else{
      toast.error(' Something went wrong while resetting your password. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
    }
    } catch (error) {
     console.log('err',error) 
      toast.error(' Something went wrong while resetting your password. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your new password"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Reset Password
        </button>
      </form>

    </div>
  );
};

export default ResetPassword;
