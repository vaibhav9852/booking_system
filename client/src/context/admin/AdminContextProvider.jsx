import { useState } from "react";
import AdminContext from "./adminContext";


const AdminContextProvider = ({children}) =>{
  const   [showUser,setShowUser] = useState(false)
  const   [showHotel,setShowHotel] = useState(false)
  const   [showBooking,setShowBooking] = useState(false)
  const   [showVisual,setShowVisual] = useState(false)
  const  [showAddHotel, setShowAddHotel] = useState(false)
  const [editHotel,setEditHotel] = useState(false) 
  const [editHotelDetails,setEditHotelDetails] = useState(false)
 
  const handleShowUser = () => {
       setShowUser(!showUser)
       setShowBooking(false)
       setShowHotel(false)
       setShowVisual(false)
       setShowAddHotel(false)
       setEditHotel(false)
  }

  const   handleShowHotel = () => {
    setShowUser(false)
    setShowBooking(false)
    setShowHotel(!showHotel)
    setShowVisual(false)
    setShowAddHotel(false)
    setEditHotel(false)
  }

  const  handleShowBooking = () => {
    setShowUser(false)
    setShowBooking(!showBooking)
    setShowHotel(false)
    setShowVisual(false)
    setShowAddHotel(false)
    setEditHotel(false)
  }

  const   handleShowVisual = () => {
    setShowUser(false)
    setShowBooking(false)
    setShowHotel(false)
    setShowVisual(!showVisual)
    setShowAddHotel(false)
    setEditHotel(false)
  }  

  const handleShowAddHotel = () =>{
    setShowUser(false)
    setShowBooking(false)
    setShowHotel(false)
    setShowVisual(false)
    setShowAddHotel(!showAddHotel)
    setEditHotel(false)
  }

  const  handleEditHotel = (value) =>{
    setShowUser(false)
    setShowBooking(false)
     setShowHotel(false)
    setShowVisual(false)
    setShowAddHotel(false)
    setEditHotelDetails(value)
    setEditHotel(!editHotel)
  

  }

    return(
        <>
        <AdminContext.Provider value={{showUser,showHotel,showBooking,showVisual,showAddHotel,editHotel,editHotelDetails,handleEditHotel,handleShowAddHotel,handleShowUser, handleShowHotel, handleShowBooking, handleShowVisual}}>                                 
        {children} 
      </AdminContext.Provider> 
        </>
    )
}

export default AdminContextProvider;