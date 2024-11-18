{/* <DatePicker
selectsEnd
selected={endDate}
onChange={(date) => setEndDate(date)}
endDate={endDate}
startDate={startDate}
minDate={startDate}
/> */}


{/* <DatePicker
selectsStart
selected={startDate}
onChange={(date) => setStartDate(date)}
startDate={startDate}
/> */}


import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingContext from "../../../context/booking/BookingContext";



 const CheckOut = () => {
    let bookingCtx =  useContext(BookingContext)
    let startDate = bookingCtx.date?.start  
  const [endDate, setEndDate] = useState(startDate);
  const filterEndDate = (endDate) => startDate < endDate;

const dateFormat = (date) =>{
     
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

 useEffect(()=>{
  let day = Math.ceil((endDate - startDate ) / (24 * 60 * 60 * 1000))
  bookingCtx.handleDay({...bookingCtx.date,end:endDate,day,startFormat:dateFormat(startDate),endFormat:dateFormat(endDate)})
  
 },[startDate,endDate])


  return (
    <div> 
      <DatePicker
      selectsEnd
        filterDate={filterEndDate}
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        startDate={startDate}
        minDate={startDate}
        className="w-1/2"
      />
      </div>
  );
}

export default CheckOut;


   

