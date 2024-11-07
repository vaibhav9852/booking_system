import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Data } from "./Data";
import { BarChart } from "./BarChart";
import AuthContext from "../../../context/auth/AuthContext";
// import "./styles.css";

Chart.register(CategoryScale); 

export default function ChartPage() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
         label: "Hotel ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
           "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  const authCtx = useContext(AuthContext)

  // let URL = `http://localhost:8005/v1/bookings/${authCtx.user?._id}`
  let URL = `http://localhost:8005/v1/bookings`
  const  fetchBooking = async() =>{
   
    try{
      let response = await fetch(URL,{
          method:'GET',
          headers:{
              'Content-Type': 'application/json'
          }
      })
      let bookings = await response.json()
     console.log('data chart ..',bookings)
      setChartData({
        labels:  bookings.data.map((data) => data.createdAt?.split('T')[0]
      ), 
        datasets: [
          {
             label: "Hotel Booking Amount",
            data:  bookings.data.map((data) => +data.totalAmount),
            backgroundColor: [
              "rgba(75,192,192,1)",
               "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      })
    }catch(err){
      console.log('err',err)
    }
  }

  useEffect(() =>{
    fetchBooking()
  },[])


  return (
    <div className="flex justify-center h-full w-full">
      <div className=" w-1/2 py-4">
      <BarChart chartData={chartData} />
      </div>
    </div>
  );
}