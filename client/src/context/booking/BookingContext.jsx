import { createContext } from "react";

const BookingContext = createContext({
    date:{},
    hotel:{},
    guest:{},
    location:'',
    locationFilter:false,
    paymentId:'',
    totalAmount:'',
    handleTotalAmount:()=>{},
    handleGuest:()=>{},
    handleDay:()=>{},
    handleHotel:()=>{},
    handleLocation:()=>{},
    findByLocation:()=>{},
    handlePaymentId:()=>{}
})

export default BookingContext;