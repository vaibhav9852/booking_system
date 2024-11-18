import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Data } from "./Data";
import { BarChart } from "./BarChart";
import AuthContext from "../../../context/auth/AuthContext";
import { toast } from "react-toastify";
import {API_BASE_URL} from "../../../config"


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

  //let URL = `http://localhost:8005/v1` 
  let token = JSON.parse(localStorage.getItem('token'))
  const  fetchBooking = async() =>{
   
    try{
      let response = await fetch(`${API_BASE_URL}/bookings`,{
          method:'GET',
          headers:{
              'Content-Type': 'application/json',
               'authorization' : `Bearer ${token}`
          }
      })
      let bookings = await response.json()
     if(bookings.data.length){
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
    }
    }catch(err){
      toast.error('Somthing wrong while fetch bookings', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
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