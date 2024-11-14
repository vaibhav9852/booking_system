import { Chart } from "chart.js"
import { useContext, useEffect, useState } from "react"
import ChartPage from "../common/chart/ChartPage"
import Users from "./user/Users"
import AddHotel from "./hotel/AddHotel"
import Hotels from "./hotel/Hotels"
import AdminContext from "../../context/admin/adminContext"
import Bookings from "./booking/Bookings"
import EditHotel from "./hotel/EditHotel"



const Admin = () =>{

  const adminCtx = useContext(AdminContext)




    return(
        <>
        <div className="flex flex-col justify-center">
           <div className="flex  text-gray-500 justify-center text-4xl font-bold py-4">Admin Dashboard</div>
           <div className="flex flex-row justify-center gap-5 py-4 ">
             <div className=" text-xl bg-white shadow-lg p-4 rounded-lg text-gray-500  font-extrabold" onClick={() => adminCtx.handleShowUser() }>Users</div>
             <div className=" text-xl bg-white shadow-lg p-4 rounded-lg text-gray-500  font-extrabold"  onClick={() => adminCtx.handleShowHotel() }>Hotels</div>
             <div className=" text-xl bg-white shadow-lg p-4 rounded-lg text-gray-500  font-extrabold" onClick={() => adminCtx.handleShowBooking() }>Bookings</div>
             <div className=" text-xl bg-white shadow-lg p-4 rounded-lg text-gray-500  font-extrabold" onClick={() => adminCtx.handleShowVisual()}>Visualize Bookings</div>                                               
           </div>
            { adminCtx.showVisual && <ChartPage />}
            { adminCtx.showUser &&  <Users />}
            { adminCtx.showHotel &&  <Hotels />}
            { adminCtx.showBooking &&  <Bookings/>}
            { adminCtx.showAddHotel && <AddHotel />}
            { adminCtx.editHotel && <EditHotel />}
        </div> 
    
        </>
    )
}

export default Admin