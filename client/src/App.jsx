//  import { useState } from 'react'
import {BrowserRouter, Routes , Route, Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

import Hotel from './pages/Hotel';
import Navbar from './components/layout/Navbar'; 
import SignupPage from './pages/SignUp';
import SigninPage from './pages/SignIn';
import HotelDetails from './components/hotels/HotelDetails';
import AuthContextProvider from './context/auth/AuthContextProvider';
import BookingContextProvider from './context/booking/BookingContextProvider';
import ProfilePage from './pages/Profile';
import ProfileEditPage from './pages/ProfileEdit';
import { useContext } from 'react';
import AuthContext from './context/auth/AuthContext';
import Complete from './pages/Complete';
import PaymentPage from './pages/PaymentPage';
import BookingContext from './context/booking/BookingContext';
import ChartPage from './components/common/chart/ChartPage';



const ProtectedRoute = ({element}) =>{
  const authCtx = useContext(AuthContext)
 console.log('app ctx',authCtx.user)
return   authCtx.user ? element : <Navigate to='/' />;
}

function App() {
 const bookingCtx = useContext(BookingContext)
  return(
    <>
      {/* <Demo1></Demo1> */}
   <AuthContextProvider>
     <BookingContextProvider>
    <Navbar />


    <Routes>
        <Route path='/' element={<Hotel />} />
         {/* <Route path='/hotel/:id' element={<HotelDetails />} />  */}
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/rooms/:id' element={<HotelDetails />} />
        <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path='/profile/edit' element={<ProfileEditPage />} />
        
        <Route path='/complete' element={<ProtectedRoute element={<Complete />} />} />
        <Route path='/payment' element={<ProtectedRoute element={<PaymentPage />} />} />
        <Route path='/visualize' element={<ProtectedRoute element={<ChartPage />} />}  />                                                  
    </Routes>
    <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick 
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BookingContextProvider>
    </AuthContextProvider> 

    </>
  )
}
  
export default App
