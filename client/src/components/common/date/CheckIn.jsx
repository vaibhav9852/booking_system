import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingContext from "../../../context/booking/bookingContext";


 const CheckIn = () => {
  const [startDate, setStartDate] = useState(new Date());
  const filterStartDate = (startDate) => new Date() < startDate;


 console.log('selected data',startDate)  
 const bookingCtx = useContext(BookingContext)

 useEffect(()=>{
  bookingCtx.handleDay({start:startDate})
 },[startDate])


  let handleStartDateChange = (date) =>{
     setStartDate(date)
 }

  return (
    <div>
      <DatePicker
      selectsStart
         filterDate={filterStartDate} 
        selected={startDate}
        onChange={(date) =>  handleStartDateChange(date)}
        startDate={startDate}
        title="date"
         className=" w-1/2"
      />
      </div>
  );
}

export default CheckIn;



