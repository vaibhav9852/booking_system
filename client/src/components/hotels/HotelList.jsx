import { useContext, useEffect, useState } from "react"
import HotelCard from "./HotelCard"
import { getHotels } from "../../services/hotelService"
import BookingContext from "../../context/booking/bookingContext"


const HotelList = () =>{
const [hotels,setHotels] = useState([])
const [error,setError] = useState(null)

const bookingCtx = useContext(BookingContext)

const fetchHotels = async () =>{
    try{
     let hotels = await getHotels()
     console.log('hotels',hotels)
     setHotels(hotels.data)
    }catch(error){
     setError('hotels not found')
    }
}

useEffect(()=>{
  fetchHotels()
},[])

useEffect(()=>{
  let filterHotel = hotels.filter((hotel) => hotel.location == bookingCtx.location )
  setHotels(filterHotel)
  // bookingCtx.handleLocation()
},[bookingCtx.locationFilter])

  return (
    <>
    <div className="flex justify-center flex-wrap ">
    {
      hotels?.length  && hotels?.map((hotel,ind) => <HotelCard hotel={hotel} ind={ind} key={hotel._id}/> )  
    }
    {error && <p className="text-red-500 flex justify-center items-center">{error}</p>}
    </div>
    </>
  )
}

export default HotelList