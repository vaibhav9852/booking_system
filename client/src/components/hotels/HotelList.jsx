import { useContext, useEffect, useState } from "react"
import HotelCard from "./HotelCard"
import { getHotels } from "../../services/hotelService"

import Loading from "../common/Loading"
import { toast } from "react-toastify"
import BookingContext from "../../context/booking/BookingContext"


const HotelList = () =>{
const [hotels,setHotels] = useState([])

const bookingCtx = useContext(BookingContext)

const fetchHotels = async () =>{
    try{
     let hotels = await getHotels()
     setHotels(hotels.data)  
    }catch(error){
      toast.error('Something wrong while fetch hotels', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
    }
}

useEffect(()=>{
  fetchHotels()
},[])

useEffect(()=>{
  let filterHotel = hotels.filter((hotel) => hotel.location?.toLowerCase() == bookingCtx.location?.toLowerCase() )
  filterHotel.length && setHotels(filterHotel) 
  // bookingCtx.handleLocation()
},[bookingCtx.locationFilter])


useEffect(()=>{
  let filterHotel = hotels.filter((hotel) => hotel.features?.includes(bookingCtx.featureFilter) )
  filterHotel.length && setHotels(filterHotel) 

  console.log('filterHotel',filterHotel)
  console.log('bookingCtx.featureFilter',bookingCtx.featureFilter) 
},[bookingCtx.featureFilter])
 
  return (
    <>
    <div className="flex justify-center flex-wrap ">
    {
      hotels  && hotels?.map((hotel,ind) => <HotelCard hotel={hotel} ind={ind} key={hotel._id}/> )  
    }
       {
     !hotels  &&  <Loading />
    } 
  
    </div>
    </>
  )
}

export default HotelList