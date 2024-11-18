import { useContext, useEffect, useState } from "react"
import HotelCard from "./HotelCard"
import { getHotels } from "../../services/hotelService"

import Loading from "../common/Loading"
import { toast } from "react-toastify"
import BookingContext from "../../context/booking/BookingContext"


const HotelList = () =>{
const [hotels,setHotels] = useState([])
const [filterHotels,setFilterHotels] = useState([])
const [hasMore, setHasMore] = useState(true);
const [loading,setLoading] = useState(false)
const [page,setPage] = useState(1) 

const bookingCtx = useContext(BookingContext)

const fetchHotels = async (pageNum) =>{
  setLoading(true)
    try{
     let hotels = await getHotels(pageNum || 1)
     if(hotels.data.length == 0){
      setHasMore(false)
     }
   
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

useEffect(()=>{
  fetchHotels(page)
},[page])


const handleScroll = () => {
  if (
    document.body.scrollHeight - 300 <
    window.scrollY + window.innerHeight
  ) {
    if(!loading && hasMore){
       setPage((prevPage) => prevPage + 1)
    }
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
},[loading,hasMore])

useEffect(()=>{  
  if(bookingCtx.locationFilter){
  let filterHotel =  hotels.filter( (hotel) => hotel.location?.toLowerCase() == bookingCtx.location?.trim()?.toLowerCase() )    
    setFilterHotels(filterHotel) 
    bookingCtx.handleLocation(false)  
    bookingCtx.findByLocation('')                                                   
  }    
},[bookingCtx.locationFilter])


useEffect(()=>{
  let filterHotel = hotels.filter((hotel) => hotel.features?.includes(bookingCtx.featureFilter) )
  filterHotel.length && setFilterHotels(filterHotel)    
},[bookingCtx.featureFilter]) 
 
  return (
    <>
    <div className="flex justify-center flex-wrap ">
    {
      filterHotels.length > 0 && (
        filterHotels.map((hotel,ind) => <HotelCard hotel={hotel} ind={ind} key={hotel._id}/>)
      )
    }

    {
      (filterHotels.length === 0 && hotels.length >0)  && hotels.map((hotel,ind) => <HotelCard hotel={hotel} ind={ind} key={hotel._id}/> )  
    }
       
      {(!filterHotels.length && hotels.length === 0 && loading) && <Loading />}
  
    </div>
    </>
  )
}

export default HotelList