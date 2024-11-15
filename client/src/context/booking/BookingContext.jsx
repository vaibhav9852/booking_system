import { createContext } from "react";

const BookingContext = createContext({
    date:{},
    hotel:{},
    guest:{},
    location:'',
    locationFilter:false,
    paymentId:'',
    totalAmount:'',
    featureFilter:'',
    mapLocation:[],   
    handleTotalAmount:()=>{},
    handleGuest:()=>{},
    handleDay:()=>{},
    handleHotel:()=>{},
    handleLocation:()=>{},
    findByLocation:()=>{},
    handlePaymentId:()=>{},
    handleFeatureFilter:() => {},
    handleMapLocation:() => {} 
})

export default BookingContext;