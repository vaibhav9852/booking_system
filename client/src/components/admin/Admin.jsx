import { Chart } from "chart.js"
import { useEffect, useState } from "react"
import ChartPage from "../common/chart/ChartPage"
import Users from "./user/Users"


const Admin = () =>{
 const [showUsers,setShowUsers] = useState(false)
 const [showChart,setShowChart] = useState(false)
 const [showHotels,setShowHotels] = useState(false)
 const [showBookungs,setShowBookings] = useState(false)



    return(
        <>
        <div className="flex flex-col justify-center">
           <div className="flex  text-gray-500 justify-center text-4xl font-bold py-8">Admin Dashboard</div>
           <div className="flex flex-row justify-around py-4 ">
             <div className=" bg-white shadow-lg p-6 rounded-lg text-gray-500  font-extrabold" onClick={() => setShowUsers(!showUsers) }>Users</div>
             <div className=" bg-white shadow-lg p-6 rounded-lg text-gray-500  font-extrabold"  onClick={() => setShowHotels(!showHotels) }>Hotels</div>
             <div className=" bg-white shadow-lg p-6 rounded-lg text-gray-500  font-extrabold" onClick={() => setShowBookings(!showBookungs) }>Bookings</div>
             <div className=" bg-white shadow-lg p-6 rounded-lg text-gray-500  font-extrabold" onClick={() => setShowChart(!showChart)}>Visualize Bookings</div>                                               
           </div>
            {showChart && <ChartPage />}
            {showUsers &&  <Users />}
        </div>
        </>
    )
}

export default Admin