import { useEffect, useState } from "react"
import { getBookins } from "../../../services/adminService"


const Bookings = () =>{

    const [bookings,setBookigs] = useState()

    const handleEdit = async () =>{

    }

    const handleDelete = async () =>{

    }
  
  
     useEffect(()=>{
           const fetchBookings = async () =>{
               let {data} = await getBookins()
               setBookigs(data)
               console.log('booking data',data)
           }

           fetchBookings()
     },[])
    return(
        <>
         <div className=" flex  justify-center  items-center py-8">
         <table className="table-auto border-separate border-spacing-8 ">
           
                <thead>
                    <tr className="border-b-2" >
                       <th className=" text-lg" >Hotel Name</th>
                       <th  className=" text-lg" >Adult</th>
                       <th  className=" text-lg" >Children</th>
                       <th  className=" text-lg">Check In</th>
                       <th  className=" text-lg">Check Out</th>
                       <th  className=" text-lg">Total Amount</th>
                   
                     
                    </tr>
                </thead>
                <tbody>
           { bookings && bookings.map((booking) =>(
            <tr className=" my-10 mx-10 " key={booking._id}>
                  <td className=" my-2 text-base font-bold py-2 ">{booking.hotelId.name}</td>
               <td className=" my-2 text-base font-medium py-2  text-center">{booking.adult}</td>
               <td className="  my-2 text-base font-medium py-2 text-center">{booking.children}</td>
               <td className="  my-2 text-base font-medium py-2 text-center">{booking.checkin}</td>
               <td className="  my-2 text-base font-medium py-2 text-center">{booking.checkout}</td>
               <td className="  my-2 text-base font-medium py-2 text-center">{booking.totalAmount}</td>
               
               </tr>
))  
    }
    </tbody>
    </table>
        </div>
        </>
    )
}

export default Bookings 