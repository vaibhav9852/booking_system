import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingContext from "../../context/booking/bookingContext";

 const Datepicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);

  const filterStartDate = (startDate) => new Date() < startDate;
  const filterEndDate = (endDate) => startDate < endDate;

 console.log('selected data',startDate)  
 console.log('end data', endDate)   
 console.log('day ', (endDate - startDate ) / (24 * 60 * 60 * 1000))
const bookingCtx = useContext(BookingContext)

 useEffect(()=>{
  let day = Math.ceil((endDate - startDate ) / (24 * 60 * 60 * 1000))
  bookingCtx.handleDay({start:startDate,end:endDate,day})
 },[startDate,endDate])


  let handleStartDateChange = (date) =>{
     setStartDate(date)
     setEndDate(date) 
 }

  return (
    <div>
      <div>
        <label>Start date</label>
      <DatePicker
         filterDate={filterStartDate} 
        selected={startDate}
        onChange={(date) =>  handleStartDateChange(date)}
      />
      </div>

      <div>
      <label>End date</label>
      <DatePicker
        filterDate={filterEndDate}
        selected={endDate}
        onChange={(date) => setEndDate(date)}
      />
      </div>
    
    </div>
  );
}

export default Datepicker;


// completed 

// 86400000  -> date / (24 * 60 * 60 * 1000)  => 1 day  

//     

