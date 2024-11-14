import {Link, useNavigate, useParams} from 'react-router-dom'
import { getHotel } from '../../services/hotelService';
import { useContext, useEffect, useState } from 'react';

import AuthContext from '../../context/auth/AuthContext';
import { toast } from 'react-toastify';

import pool from '../../assets/images/pool.jpg'
import beach from '../../assets/images/beach.jpg'
import ImageSlider from '../common/ImageSlider';
import Map from '../common/map/Map'
import BookingContext from '../../context/booking/BookingContext';
import SelectLocation from '../common/map/SelectLocation';

const HotelDetails = () =>{

  const bookingCtx = useContext(BookingContext)
  const authCtx = useContext(AuthContext)
    const [hotel,setHotel] = useState(null)
    const [taotaGuest,setTotalGuest] = useState(bookingCtx.guest?.adult + bookingCtx.guest?.children)
    const [taotalCharge,setTotalCharge] = useState(0)
    const navigate = useNavigate()

    useEffect(()=>{
      setTotalGuest(bookingCtx.guest?.adult + bookingCtx.guest?.children)
    },[bookingCtx.guest])
  let {id} = useParams();
  
  const fetchHotel = async () =>{
    try{
     const response = await getHotel(id)
     setHotel(response.data)
     bookingCtx.handleHotel(response.data) 
    }catch(err){
      toast.error(' Can not find hotel ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    })}
  }
 console.log('hotel',hotel)

  const handleReserve = () =>{
       if(!authCtx.user?.verified && hotel){
        toast.error('Please login', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
      })
       }else if(((!bookingCtx.date?.day || (!bookingCtx.guest.adult && !bookingCtx.guest.children) )&& hotel )){
        toast.error('Please add guest details', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
      })
       }else{
        setTotalGuest(0)
          navigate('/payment')
       }
        //  navigate('/payment')
  }

  useEffect(()=>{
   fetchHotel()
  },[])

    return (
        <>
      { hotel &&   <div className="flex   w-full h-full  p-5  flex-col justify-center items-center ">
         {/* <img src={`${hotel?.image[0]}`} alt="img" className="w-1/2  h-1/2 border-gray-100 rounded-xl"/> */}
         <div className='w-1/2  h-1/2'>
         <ImageSlider images={hotel?.image} height={'h-96'} />
         </div>
         
          <div className="my-2">
          <div className="    text-2xl font-bold">{hotel.name}</div>
          <div className=" text-xl font-light">{hotel.description}</div> 
          <div className="mt-2 text-xl font-bold ">
          
       <span>&#8377;{hotel.charge} night  </span>   </div>
          </div>
        </div>
} 

{
  hotel && <div className='float-left flex justify-center items-center  w-1/3   mt-20 mb-10'> 
    <div className='flex flex-col  justify-center'>
        <div className=' text-gray-600 text-2xl font-bold'>What this place offers</div>
        <div className='flex mt-6'>
            <div><svg fill="#000000" height="32px" width="32px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Layer_1"> <path d="M1,38h23v3H12v2h26v-2H26v-3h23V8H1V38z M3,10h44v26H3V10z"></path> </g> <g> </g> </g></svg></div>
                <div className='ml-4'>TV</div>
        </div>
        <div className='flex mt-6'>
            <div>
            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_191)"> <rect width="24" height="24" fill="white"></rect> <path d="M9 14C9 14 9.5 12 12 12C14.5 12 15 14 15 14" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 12C7 12 7.83333 9 12 9C16.1667 9 17 12 17 12" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 10C5 10 6.16667 6 12 6C17.8333 6 19 10 19 10" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="17" r="2" stroke="#000000" stroke-linejoin="round"></circle> </g> <defs> <clipPath id="clip0_15_191"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
            </div>
                <div className='ml-4'>Wifi</div>
        </div>
     { hotel.features.includes('pool') &&  <div className='flex mt-6'>
            <div>
              <img src={pool} alt='img' className=' h-8 w-8' />
         </div>
                <div className='ml-4'>Amazing pools</div>
        </div>  }
     { hotel.features.includes('beach') &&   <div className='flex mt-6'>
            <div>
            <img src={beach} alt='img' className=' h-8 w-8' />
             </div>
                <div className='ml-4'>Beach</div>
        </div> }
        </div>
  </div>
}
{
  hotel && <div className=' float-right w-96 h-max shadow-lg  shadow-white-500/50  mr-24 my-10 py-4 bottom-1 rounded-lg'>
     <div className='flex justify-start flex-col ml-4'>
         <div className='flex  font-semibold text-xl'>
          <span>&#8377;{hotel.charge}  </span> <p className=' ml-2 text-lg font-normal'>night </p>
         </div>
         <div className='flex justify-start mt-4 flex-col '>
         <div className='w-80 h-16 border-2 rounded-lg hover:border-black flex justify-around items-center text-xs font-medium'>
          <div className=' '>
           <div>CHECK-IN</div>
           <div>{bookingCtx?.date?.startFormat}</div>
           </div>
         <div className='flex border-x-2  border-gray-500  boreder h-16'></div>
           <div>
           <div>CHECKOUT</div>
           <div>{bookingCtx?.date?.endFormat}</div>
           </div>
         </div>
         <div className='w-80 h-16 border-2 rounded-lg hover:border-black   '>
         <div className='h-full  ml-6 mt-2'>
          <div className='text-xs font-medium'>GUESTS</div>
          <div className='text-sm font-normal'>{taotaGuest ? taotaGuest : 0} guests</div>
          </div>
         </div>
         </div>

         <div className='flex justify-center items-center mt-4 w-80  bg-rose-500 text-white font-semibold rounded-lg p-4'>
          <button onClick={handleReserve}>
           
            Reserve
            
      
            </button>
         </div>

         <div className='flex justify-center mt-2'>
           <p>You won't be charged yet</p>
         </div>

         <div className='w-80 flex justify-between mt-4 text-lg'>
            <div><span>&#8377;{hotel.charge}&#xD7;{(bookingCtx.date?.day>0?bookingCtx.date?.day:1)} nights</span></div>
            <div><span>&#8377;{+hotel.charge*(+bookingCtx.date?.day>0?+bookingCtx.date?.day:1)*(+taotaGuest>0 ? +taotaGuest : 1)}</span></div>
         </div>
         <div className='w-80 flex justify-between mt-4 text-lg'>
            <div><p>Airbnb service fee</p></div>
            <div><span>&#8377;{Math.floor(hotel.charge/7)}</span></div>
         </div>
         <div className='w-80 my-4 border-y-2'></div>
         <div className='w-80 flex justify-between mt-4 text-lg font-semibold'>
          <div><p>Total before taxes</p></div>
          <div><span>&#8377;{+hotel.charge*(+bookingCtx.date?.day>0?+bookingCtx.date?.day:1)*(+taotaGuest>0 ? +taotaGuest : 1) + Math.floor(hotel.charge/7)}</span></div>
         </div>
     </div>
  </div>
}
{ hotel && <div className='ml-10 mb-10 h-full mt-6'>
  <Map coordinates={hotel.coordinates}/>  
  {/* <SelectLocation /> */} 
  </div>}
        </>  
    )
}

export default HotelDetails