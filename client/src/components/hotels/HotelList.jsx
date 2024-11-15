import { useContext, useEffect, useState } from "react"
import HotelCard from "./HotelCard"
import { getHotels } from "../../services/hotelService"

import Loading from "../common/Loading"
import { toast } from "react-toastify"
import BookingContext from "../../context/booking/BookingContext"


const HotelList = () =>{
const [hotels,setHotels] = useState([])
const [loading,setLoading] = useState(false)
const [page,setPage] = useState(1) 
const bookingCtx = useContext(BookingContext)

const fetchHotels = async (pageNum) =>{
  setLoading(true)
    try{
     let hotels = await getHotels(pageNum)
     setHotels( (prevHotels) => [...prevHotels,...hotels.data])  
    }catch(error){
      toast.error('Something wrong while fetch hotels', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
    }finally{
      setLoading(false)
    }
}

// useEffect(()=>{
//   fetchHotels()
// },[])


useEffect(()=>{
  fetchHotels(page)
 alert(page)
},[page])

useEffect(()=>{
   if(loading){
        setPage((prevPage) => prevPage + 1)
   }
},[loading])

const handleScroll = () => {
  if (
    document.body.scrollHeight - 300 <
    window.scrollY + window.innerHeight
  ) {
    console.log('scroll',document.body.scrollHeight, window.scrollY,window.innerHeight, window.scrollY + window.innerHeight)
    setLoading(true);
  }
};


function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const debounceHandleScroll = debounce(handleScroll, 500);

useEffect(()=>{
  window.addEventListener("scroll", debounceHandleScroll);
  return ()=>{
    window.removeEventListener("scroll", debounceHandleScroll); 
  }
})








// useEffect(()=>{
//   let filterHotel =  hotels.filter( (hotel) => hotel.location?.toLowerCase() == bookingCtx.location?.toLowerCase() )
//   filterHotel.length && setHotels(filterHotel) 
//    bookingCtx.findByLocation(false)
//   console.log('bookingCtx.locationFilter',bookingCtx.locationFilter , bookingCtx.location)
// },[bookingCtx.locationFilter])

useEffect(() => {
  if (bookingCtx.locationFilter) {
    // Apply location filter when it's set to true
    if (bookingCtx.location) {
      const filterByLocation = hotels.filter(
        (hotel) =>
          hotel.location?.toLowerCase() === bookingCtx.location?.toLowerCase()
      );

      // Only update the hotels if there are matching hotels
      if (filterByLocation.length > 0) {
        setHotels(filterByLocation);
      } else {
        // Optionally, show a message that no hotels match the filter
        setHotels([]);
      }
    } else {
      // If no location is provided, fetch all hotels (or do nothing)
      fetchHotels(page);
    }

    // Reset locationFilter to false after applying the filter
    bookingCtx.findByLocation(false); // Reset context flag after filter is applied

    console.log("Filtered Hotels:", hotels);
  }
}, [bookingCtx.locationFilter, bookingCtx.location]); 


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
     (!hotels && loading )  &&  <Loading />
    } 
  
    </div>
    </>
  )
}

export default HotelList