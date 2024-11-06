import {  useState } from "react"
import BookingContext from "./BookingContext"

const BookingContextProvider = ({children}) =>{
 const [guest,setGuest] = useState({})
 const [hotel,setHotel] = useState()
 const [date,setDate] = useState()
 const [location,setLocation] = useState()
 const [locationFilter,setLocationFilter] = useState(false)
 const [dpmCheckerLink,setDpmCheckerLink] = useState()
const [paymentId,setPaymentId] = useState()
const [totalAmount,setTotalAmount] = useState()

 const handleGuest = (newGuest) =>{
    setGuest(newGuest)
 }

 const handleHotel = (hotel) =>{
     setHotel(hotel)
 }

 const handleDay = (date) =>{
 setDate(date)
 }

 const handleLocation = (e)=>{
    setLocation(e.target.value)
 }

 const findByLocation = (value) => {
  setLocationFilter(value)
 }

 const handlePaymentId = (value) =>{
 setPaymentId(value)
 }

 const  handleTotalAmount = (value) =>{
    setTotalAmount(value)
 }

    return(
      <BookingContext.Provider value={{date,hotel,guest,location,locationFilter,paymentId,totalAmount,handleTotalAmount,handlePaymentId,handleLocation,handleGuest,handleDay,handleHotel,findByLocation}}>
         {children}
      </BookingContext.Provider>
    )
}

export default BookingContextProvider