import { useContext, useEffect, useState } from "react"
import { deleteHotel, getHotels } from "../../../services/adminService"
import { toast } from "react-toastify"
import AdminContext from "../../../context/admin/adminContext"
import EditHotel from "./EditHotel"


const Hotels = () =>{
    const [hotels,setHotels] = useState() 
    const [edit,setEdit] = useState(false)

    
    const adminCtx = useContext(AdminContext)
    
    const handleEdit = async (e,hotel) =>{
      e.preventDefault()
      adminCtx.handleEditHotel(hotel)

    }
    const handleDelete = async (e,hotelId) =>{
      e.preventDefault()
      let response = await deleteHotel(hotelId)
      if(response.success){
        toast.success('hotel deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
      }else{
        toast.error('Something wrong while delete hotel', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
      }
      console.log('resp after delete hotel',response)
    }

    useEffect(() =>{
      const fetchHotels = async () =>{
        let {data} = await  getHotels()
        setHotels(data)
      }

      fetchHotels()
    },[])

    return(
        <> 
        <div className=" w-full py-4  px-10">
            <button  onClick={() => adminCtx.handleShowAddHotel()} className=" float-right w-max text-white shadow-lg bg-green-500 p-2 rounded-lg font-bold">Add Hotel</button>
        </div>
        
     <div className=" flex  justify-center  items-center ">
       
         <table className="table-auto border-separate border-spacing-8 ">
            <tbody>
           { hotels && hotels.map((hotel) =>(
            <tr className=" my-10 mx-10 " key={hotel._id}>
               <td className=" my-2 text-lg font-bold py-2 ">{hotel.name}</td>
               <td className="  my-2 text-base font-bold py-2">{hotel.email}</td>
               <td className="  text-center my-2 px-2 text-lg font-bold  shadow-lg  rounded-lg text-white bg-gray-500" > <button onClick={(e) => handleEdit(e,hotel)}> Edit </button></td>
               <td className="  text-center  my-2 px-2 text-lg font-bold  shadow-lg rounded-lg text-white bg-red-500"><button onClick={(e) => handleDelete(e,hotel._id)}>Delete</button></td>                                             
               </tr>
))  
    }
    </tbody>
    </table>
        </div>
        </>
    )
}

export default Hotels