import { Link, matchPath, useLocation } from 'react-router-dom'
import Datepicker from '../date/Datepicker';
import Guest from '../guest/Guest';
import CheckIn from '../common/date/CheckIn';
import CheckOut from '../common/date/CheckOut';
import { useEffect, useRef, useState } from 'react'; 
import { useContext } from 'react';
import AuthCard from './AuthCard';

 import beach from '../../assets/images/beach.jpg'
 import cabins from '../../assets/images/cabins.jpg'
 import golfing from '../../assets/images/golfing.jpg'
 import pool from '../../assets/images/pool.jpg'  
import Icon_Button from '../../assets/icons/Icon_Button.svg'
import BookingContext from '../../context/booking/BookingContext';

const Navbar = () => {
const [checkOut,setCheckOut] = useState(false)
const [checkIn,setCheckIn] = useState(false)
const [guest,setGuest] = useState(false)
const [totalGuest,setTotalGuest] = useState(null)
const [showAuth,setShowAuth] = useState(false)

const bookingCtx = useContext(BookingContext) 
useEffect(()=>{
 setTotalGuest(bookingCtx.guest?.adult + bookingCtx.guest?.children) 
},[bookingCtx.guest]) 

const handleIconClick = async (value) =>{
       bookingCtx.handleFeatureFilter(value) 
}

const cardRef = useRef(null);  
const iconRef = useRef(null); 
const guestCardRef = useRef(null);
const guestIconRef = useRef(null);

const location = useLocation();
const hideOnRoutes = ['/signin', '/signup', '/admin',  '/forgot-password','/profile','profile/edit','/payment', '/complete'];
const isResetPasswordRoute = location.pathname?.split('/')[1] ==  'reset-password'; 
const shouldHideNavbarContent = hideOnRoutes.some(route => location.pathname.startsWith(route)) || isResetPasswordRoute;

const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target) && 
        iconRef.current && !iconRef.current.contains(event.target)) {
      setShowAuth(false);  
    }
    if (
        guestCardRef.current && !guestCardRef.current.contains(event.target) && 
        guestIconRef.current && !guestIconRef.current.contains(event.target) 
      ) {
        setGuest(false);  
      }
  };


useEffect(() => {
  document.addEventListener('click', handleClickOutside);

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

    return (
        <>
          <div className="flex  justify-between  px-10 py-5">
     
               <div>
                    <Link to={'/'}>
                    <svg width="102" height="32" viewBox="0 0 102 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.24 22.6799C29.08 22.2899 28.93 21.8799 28.77 21.5299L28.03 19.8599L28 19.8299C25.8 15.0299 23.45 10.1499 20.96 5.34994L20.86 5.14994C20.61 4.67994 20.36 4.15994 20.1 3.67994C19.78 3.10994 19.47 2.49994 18.96 1.91994C18.4629 1.31308 17.8372 0.824133 17.1282 0.488399C16.4192 0.152666 15.6445 -0.0214844 14.86 -0.0214844C14.0755 -0.0214844 13.3008 0.152666 12.5918 0.488399C11.8828 0.824133 11.2571 1.31308 10.76 1.91994C10.29 2.49994 9.94 3.10994 9.62 3.67994C9.37 4.19994 9.12 4.70994 8.86 5.17994L8.76 5.37994C6.31 10.1799 3.92 15.0599 1.72 19.8599L1.66 19.9199C1.44 20.4399 1.18 20.9799 0.930001 21.5599C0.770001 21.9099 0.610001 22.2899 0.450001 22.7099C0.0180336 23.8097 -0.119907 25.0031 0.0497732 26.1724C0.219454 27.3418 0.690899 28.4467 1.41765 29.3784C2.14439 30.31 3.10136 31.0362 4.19423 31.4854C5.2871 31.9346 6.47815 32.0912 7.65 31.9399C8.77347 31.7921 9.85528 31.4178 10.83 30.8399C12.13 30.1099 13.38 29.0499 14.78 27.5199C16.18 29.0499 17.46 30.1099 18.73 30.8499C19.9513 31.5668 21.3344 31.9624 22.75 31.9999C24.3894 32.0068 25.9758 31.4202 27.2165 30.3487C28.4571 29.2771 29.2682 27.7928 29.5 26.1699C29.7678 25.0037 29.6772 23.7838 29.24 22.6699V22.6799ZM14.88 24.3399C13.16 22.1399 12.04 20.1199 11.66 18.3899C11.5026 17.7489 11.4686 17.0837 11.56 16.4299C11.63 15.9199 11.82 15.4699 12.08 15.0899C12.68 14.2199 13.73 13.6799 14.88 13.6799C15.4261 13.6633 15.9679 13.7824 16.4566 14.0268C16.9453 14.2711 17.3657 14.633 17.68 15.0799C17.94 15.4799 18.13 15.9199 18.19 16.4299C18.29 17.0099 18.25 17.6799 18.09 18.3899C17.71 20.0899 16.59 22.1299 14.88 24.3399ZM27.62 25.8199C27.5064 26.6439 27.1789 27.4237 26.67 28.0816C26.1612 28.7396 25.4889 29.2527 24.72 29.5699C23.96 29.8899 23.12 29.9799 22.3 29.8899C21.5 29.7899 20.7 29.5299 19.88 29.0499C18.5185 28.2084 17.2943 27.1629 16.25 25.9499C18.35 23.3499 19.62 20.9799 20.1 18.8699C20.33 17.8699 20.36 16.9699 20.26 16.1399C20.1351 15.3532 19.8418 14.6028 19.4 13.9399C18.8956 13.2212 18.2223 12.6374 17.4394 12.2398C16.6565 11.8423 15.7879 11.6431 14.91 11.6599C13.06 11.6599 11.41 12.5199 10.41 13.9299C9.95984 14.5911 9.66891 15.3475 9.56 16.1399C9.43 16.9799 9.46 17.9099 9.72 18.8699C10.2 20.9799 11.5 23.3799 13.57 25.9699C12.5435 27.2061 11.3164 28.2608 9.94 29.0899C9.11 29.5699 8.32 29.8199 7.52 29.9199C6.27589 30.0793 5.01915 29.7412 4.02296 28.9791C3.02677 28.2169 2.37165 27.0924 2.2 25.8499C2.1 25.0499 2.17 24.2499 2.49 23.3499C2.59 23.0299 2.74 22.7099 2.9 22.3299C3.12 21.8099 3.38 21.2699 3.63 20.7299L3.67 20.6599C5.83 15.8899 8.19 11.0199 10.64 6.24994L10.74 6.04994C10.99 5.56994 11.24 5.05994 11.5 4.57994C11.76 4.06994 12.04 3.57994 12.4 3.17994C12.7116 2.80797 13.101 2.50882 13.5407 2.30356C13.9804 2.09831 14.4597 1.99193 14.945 1.99193C15.4303 1.99193 15.9096 2.09831 16.3493 2.30356C16.789 2.50882 17.1784 2.80797 17.49 3.17994C17.84 3.57994 18.13 4.06994 18.39 4.57994C18.64 5.05994 18.89 5.57995 19.15 6.04994L19.25 6.24994C21.69 11.0199 24.05 15.8899 26.25 20.6599L26.28 20.6899C26.54 21.2099 26.76 21.7899 27.01 22.2899C27.17 22.6799 27.33 22.9899 27.43 23.3199C27.62 24.2199 27.72 25.0199 27.62 25.8199ZM41.54 24.1199C40.7865 24.131 40.0401 23.9722 39.3563 23.6554C38.6725 23.3386 38.0688 22.8719 37.59 22.2899C36.5141 21.0499 35.943 19.451 35.99 17.8099C35.9735 16.1332 36.563 14.5068 37.65 13.2299C38.1528 12.6406 38.7787 12.1686 39.4836 11.8472C40.1885 11.5259 40.9553 11.3629 41.73 11.3699C42.4589 11.35 43.181 11.5157 43.8282 11.8516C44.4755 12.1875 45.0267 12.6824 45.43 13.2899L45.53 11.7199H48.45V23.7999H45.52L45.42 22.0399C45.0042 22.6886 44.4294 23.2202 43.7503 23.5842C43.0713 23.9483 42.3104 24.1327 41.54 24.1199ZM42.3 21.2399C42.88 21.2399 43.39 21.0799 43.87 20.7899C44.31 20.4699 44.67 20.0499 44.95 19.5399C45.2 19.0299 45.33 18.4199 45.33 17.7399C45.369 17.1493 45.254 16.5587 44.9964 16.0259C44.7387 15.493 44.3471 15.0361 43.86 14.6999C43.3919 14.4083 42.8515 14.2537 42.3 14.2537C41.7485 14.2537 41.2081 14.4083 40.74 14.6999C40.3 15.0199 39.94 15.4399 39.66 15.9499C39.3956 16.5124 39.2655 17.1286 39.28 17.7499C39.241 18.3405 39.356 18.9312 39.6136 19.464C39.8713 19.9969 40.2629 20.4538 40.75 20.7899C41.22 21.0799 41.73 21.2399 42.3 21.2399ZM53.45 8.45994C53.45 8.80995 53.39 9.12994 53.23 9.38995C53.07 9.63995 52.85 9.86994 52.56 10.0299C52.27 10.1899 51.96 10.2499 51.64 10.2499C51.32 10.2499 51 10.1899 50.71 10.0299C50.4357 9.87726 50.2051 9.65694 50.04 9.38995C49.8851 9.10508 49.8092 8.78401 49.82 8.45994C49.82 8.09995 49.89 7.77994 50.04 7.52994C50.2 7.22994 50.43 7.04994 50.71 6.88994C51 6.72994 51.31 6.65994 51.64 6.65994C51.9583 6.65261 52.2731 6.728 52.5535 6.87874C52.834 7.02948 53.0705 7.25042 53.24 7.51994C53.3855 7.81149 53.4576 8.13418 53.45 8.45994ZM50.05 23.7599V11.6999H53.23V23.7799H50.04L50.05 23.7599ZM61.73 14.8599V14.8999C61.58 14.8299 61.38 14.7999 61.23 14.7699C61.03 14.7299 60.87 14.7299 60.68 14.7299C59.79 14.7299 59.12 14.9899 58.68 15.5299C58.2 16.0799 57.98 16.8499 57.98 17.8399V23.7699H54.79V11.6899H57.72L57.82 13.5199C58.14 12.8799 58.52 12.3999 59.06 12.0399C59.5971 11.6902 60.2295 11.5155 60.87 11.5399C61.1 11.5399 61.32 11.5599 61.51 11.5999C61.61 11.6299 61.67 11.6299 61.73 11.6599V14.8599ZM63.01 23.7599V6.73994H66.19V13.2399C66.64 12.6599 67.15 12.2099 67.79 11.8599C68.8032 11.3632 69.9542 11.2223 71.0573 11.4599C72.1604 11.6976 73.1513 12.3 73.87 13.1699C74.9483 14.4125 75.5195 16.0154 75.47 17.6599C75.4865 19.3367 74.897 20.9631 73.81 22.2399C73.3072 22.8293 72.6813 23.3013 71.9764 23.6227C71.2715 23.944 70.5047 24.1069 69.73 24.0999C69.0011 24.1199 68.279 23.9541 67.6318 23.6183C66.9845 23.2824 66.4333 22.7875 66.03 22.1799L65.93 23.7499L63.01 23.7799V23.7599ZM69.16 21.2399C69.73 21.2399 70.24 21.0799 70.72 20.7899C71.16 20.4699 71.52 20.0499 71.8 19.5399C72.06 19.0299 72.18 18.4199 72.18 17.7399C72.18 17.0699 72.06 16.4599 71.8 15.9499C71.5374 15.4582 71.1684 15.0312 70.72 14.6999C70.2519 14.4083 69.7115 14.2537 69.16 14.2537C68.6085 14.2537 68.0681 14.4083 67.6 14.6999C67.15 15.0199 66.8 15.4399 66.51 15.9499C66.2456 16.5124 66.1155 17.1286 66.13 17.7499C66.091 18.3405 66.206 18.9312 66.4636 19.464C66.7213 19.9969 67.1129 20.4538 67.6 20.7899C68.07 21.0799 68.58 21.2399 69.16 21.2399ZM76.67 23.7699V11.6899H79.6L79.7 13.2599C80.0682 12.6581 80.5905 12.1656 81.2129 11.8333C81.8352 11.501 82.5351 11.3411 83.24 11.3699C84.0461 11.356 84.8384 11.5801 85.5178 12.0141C86.1973 12.448 86.7337 13.0727 87.06 13.8099C87.41 14.5699 87.6 15.5099 87.6 16.5599V23.7999H84.41V16.9799C84.41 16.1399 84.22 15.4799 83.84 14.9899C83.46 14.5099 82.94 14.2499 82.28 14.2499C81.8 14.2499 81.38 14.3499 81.01 14.5699C80.66 14.7999 80.37 15.0899 80.15 15.4999C79.9276 15.9144 79.8173 16.3798 79.83 16.8499V23.7699H76.67ZM89.19 23.7699V6.72994H92.38V13.2299C92.8121 12.6467 93.3742 12.1722 94.0216 11.8441C94.6691 11.5161 95.3842 11.3434 96.11 11.3399C96.8635 11.3289 97.6099 11.4877 98.2937 11.8045C98.9775 12.1213 99.5812 12.588 100.06 13.1699C101.131 14.4125 101.698 16.0105 101.65 17.6499C101.667 19.3269 101.078 20.9536 99.99 22.2299C99.4872 22.8193 98.8613 23.2913 98.1564 23.6127C97.4515 23.934 96.6847 24.0969 95.91 24.0899C95.1811 24.1099 94.459 23.9441 93.8118 23.6083C93.1645 23.2724 92.6133 22.7775 92.21 22.1699L92.12 23.7399L89.19 23.7699ZM95.37 21.2399C95.95 21.2399 96.46 21.0799 96.93 20.7899C97.38 20.4699 97.73 20.0499 98.02 19.5399C98.27 19.0299 98.4 18.4199 98.4 17.7399C98.439 17.1493 98.324 16.5587 98.0664 16.0259C97.8087 15.493 97.4171 15.0361 96.93 14.6999C96.4619 14.4083 95.9215 14.2537 95.37 14.2537C94.8185 14.2537 94.2781 14.4083 93.81 14.6999C93.37 15.0199 93.01 15.4399 92.73 15.9499C92.4509 16.5074 92.32 17.1273 92.35 17.7499C92.311 18.3405 92.426 18.9312 92.6837 19.464C92.9413 19.9969 93.3329 20.4538 93.82 20.7899C94.29 21.0799 94.77 21.2399 95.37 21.2399Z" fill="#DE3151" />
                    </svg>
                    </Link>
                </div>

                <div className=' w-24 h-10  shadow-md  border-2 rounded-full relative' ref={iconRef}>
                    <div className='flex h-full justify-center items-center  justify-evenly'  onClick={() => setShowAuth(!showAuth)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.75 5.75H19.25" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.75 18.25H19.25" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.75 12H19.25" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div className=' flex justify-center items-center overflow-hidden w-8 h-8 bg-slate-500 p-1 rounded-full'>
                            <svg width="32" height="26" viewBox="0 0 32 26" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 21.992V26.0013H0V22.0066C1.86127 19.5192 4.27721 17.5004 7.05572 16.1107C9.83423 14.721 12.8987 13.9987 16.0053 14.0013C22.544 14.0013 28.352 17.14 32 21.992ZM21.336 5.99996C21.336 7.41445 20.7741 8.771 19.7739 9.77119C18.7737 10.7714 17.4172 11.3333 16.0027 11.3333C14.5882 11.3333 13.2316 10.7714 12.2314 9.77119C11.2312 8.771 10.6693 7.41445 10.6693 5.99996C10.6693 4.58547 11.2312 3.22892 12.2314 2.22872C13.2316 1.22853 14.5882 0.666626 16.0027 0.666626C17.4172 0.666626 18.7737 1.22853 19.7739 2.22872C20.7741 3.22892 21.336 4.58547 21.336 5.99996Z" fill="" />
                            </svg>
                        </div>


                    </div>
                    {showAuth && ( <div ref={cardRef}> <AuthCard  updateFun={setShowAuth}/> </div> ) }
                </div>
            </div>

            <div className='flex    justify-center  text-sm  font-semibold'>
        {!shouldHideNavbarContent && <div className='flex   items-center  my-5  w-11/12 sm:w-2/3  h-max shadow-md border-2 rounded-full'>
                    <div className=' flex-1 overflow-hidden p-2 w-1/5   py-4 px-10  hover:bg-gray-200  rounded-full'> 
                  
                        <div><p>Where</p></div>
                        <input type='text' placeholder='Search destinations' onChange={ bookingCtx.handleLocation} className=' w-48 sm:w-32  hover:bg-gray-200 border-0 focus:outline-none focus:ring-0 bg-transparent ' />
                    </div>
                 
                 <div className='  border-x-2 border-gray-200 h-10 '></div>

                    <div className=' flex-1 hover:bg-gray-200 rounded-full py-4 px-3'>
                        <div onClick={()=>{setCheckIn(!checkIn)}}>
                        <div><p>Check In</p></div>
                     {!checkIn &&   <div className='  text-gray-400'><p>Add dates</p></div> }
                      </div>
                      {checkIn && <CheckIn />}  
                    </div>

                    <div className=' border-x-2 border-gray-200 h-10 '></div>

                    <div  className=' flex-1  hover:bg-gray-200 rounded-full py-4 px-3'>
                        <div onClick={()=> setCheckOut(!checkOut)}>
                        <div><p>Check Out</p></div>
                     {!checkOut &&   <div className='  text-gray-400'><p>Add dates</p></div> }
                        </div>
                        {checkOut && <CheckOut />}
                      
                    </div>
                 
                 
                    <div className=' border-x-2 border-gray-200 h-10 '></div>

                    <div className='flex flex-1 justify-between items-center w-1/5 py-3 px-3    hover:bg-gray-200  rounded-full  relative'> 
                    {/* hover:w-1/3  */}
                        <div ref={guestIconRef}>
                        <div onClick={() => setGuest(!guest)}>
                            <div className=' font-semibold'><p>Who</p></div>
                            <div className='  text-gray-400'>{totalGuest ? <p className='text-gray-800 font-semibold'>{totalGuest} guests</p> : <p>Add guests</p>}</div>
                        </div>
                          {guest && ( <div ref={guestCardRef}> <Guest /> </div>)}
                        </div>

                        <div onClick={() => bookingCtx.findByLocation(true)}>
                            <img src={Icon_Button} alt='search' />
                        </div>

                    </div>
                  
                </div> }
            
            </div>
            <div className='w-full border-gray-200 ' style={{ borderWidth: '1px' }}></div>
     {!shouldHideNavbarContent &&      <div className='w-full flex justify-around py-3 '>
                   <div className='flex justify-center items-center flex-col opacity-70 hover:opacity-100' onClick={() => handleIconClick('beach')}>
                    <img src={beach} alt='beach' className='flex justify-center   w-8 h-8' />
                   Beach 
                    </div>
                    <div className='flex justify-center items-center flex-col  opacity-70 hover:opacity-100' onClick={() => handleIconClick('cabin')}>
                    <img src={cabins} alt='beach' className='flex  justify-center items-center w-8 h-8' />
                    Cabins  
                    </div>
                    <div className='flex justify-center items-center flex-col  opacity-70 hover:opacity-100' onClick={() => handleIconClick('goalf')}>
                    <img src={golfing} alt='beach' className='flex justify-center w-8 h-8' />
                    Goalfing 
                    </div>
                    <div className='flex justify-center items-center flex-col  opacity-70 hover:opacity-100' onClick={() => handleIconClick('pool')}>
                    <img src={pool} alt='beach' className='flex justify-center w-8 h-8' />
                    Amazing pools 
                    </div>
            </div> }
        </>
    )
}

export default Navbar;