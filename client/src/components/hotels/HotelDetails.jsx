import {Link, useParams} from 'react-router-dom'
import { getHotel } from '../../services/hotelService';
import { useContext, useEffect, useState } from 'react';
import BookingContext from '../../context/booking/BookingContext';
import AuthContext from '../../context/auth/AuthContext';
import { toast } from 'react-toastify';



const HotelDetails = () =>{
  const bookingCtx = useContext(BookingContext)
  const authCtx = useContext(AuthContext)
    const [hotel,setHotel] = useState(null)
    const [taotaGuest,setTotalGuest] = useState(bookingCtx.guest.adult + bookingCtx.guest.children)
    const [taotalCharge,setTotalCharge] = useState(0)

    useEffect(()=>{
      setTotalGuest(bookingCtx.guest.adult + bookingCtx.guest.children)
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

  useEffect(()=>{
   fetchHotel()
  },[])

    return (
        <>
      { hotel &&   <div className="flex   w-full h-full  p-5  flex-col justify-center items-center ">
         <img src={`${hotel?.image[0]}`} alt="img" className="w-1/2  h-1/2 border-gray-100 rounded-xl"/>
          <div className="my-2">
          <div className="    text-2xl font-bold">{hotel.name}</div>
          <div className=" text-xl font-light">{hotel.description}</div> 
          <div className="mt-2 text-xl font-bold ">
          
       <span>&#8377;{hotel.charge} night  </span>   </div>
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
          <button>
            <Link to={authCtx.user ? '/payment' : `/rooms/${id}`}>
            Reserve
            {(!authCtx.user && hotel )&&  toast.error('Please login', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            })}
            </Link>
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
        </>
    )
}

export default HotelDetails