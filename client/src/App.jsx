
import {BrowserRouter, Routes , Route, Navigate, useLocation} from 'react-router-dom'
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

import Admin from './components/admin/Admin';
import BookingContext from './context/booking/BookingContext.jsx';
import AdminContextProvider from './context/admin/AdminContextProvider';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import VerifyEmail from './components/auth/VerifyEmai';



const ProtectedRoute = ({element}) =>{
  const authCtx = useContext(AuthContext)
return   authCtx.user?.verified ? element : <Navigate to='/' />;
}

function App() {
 const bookingCtx = useContext(BookingContext)
 let loaction = useLocation().pathname

 
  return(
    <>
      {/* <Demo1></Demo1> */}
   
   <AuthContextProvider>
   <AdminContextProvider>
    <BookingContextProvider>
    
  {/* { (loaction != '/admin' && (loaction != '/profile' && loaction != '/profile/edit') )  &&  <Navbar />   }
   */}
    <Navbar /> 
  
    <Routes>
        <Route path='/' element={<Hotel />} /> 
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/rooms/:id' element={<HotelDetails />} />
        <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path='/profile/edit' element={<ProfileEditPage />} />
        <Route path='/complete' element={<ProtectedRoute element={<Complete />} />} />
        <Route path='/payment' element={<ProtectedRoute element={<PaymentPage />} />} />
   
        <Route path='/admin'  element={<ProtectedRoute element={<Admin />} />}   />  

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
    </AdminContextProvider>
    </AuthContextProvider> 

    </>
  )
}
  
export default App
