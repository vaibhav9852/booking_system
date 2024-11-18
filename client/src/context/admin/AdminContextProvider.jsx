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
  const [editUser,setEditUser] = useState(false)
  const [editUserDetails,setEditUserDetails] = useState()
 
  const handleShowUser = () => {
       setShowUser(!showUser)
       setShowBooking(false)
       setShowHotel(false)
       setShowVisual(false)
       setEditUser(false)
       setShowAddHotel(false)
       setEditHotel(false)
  }

  const   handleShowHotel = () => {
    setShowUser(false)
    setShowBooking(false)
    setEditUser(false)
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
    setEditUser(false)
    setShowAddHotel(false)
    setEditHotel(false)
  }

  const   handleShowVisual = () => {
    setShowUser(false)
    setShowBooking(false)
    setShowHotel(false)
    setEditUser(false)
    setShowVisual(!showVisual)
    setShowAddHotel(false)
    setEditHotel(false)
  }  

  const handleShowAddHotel = () =>{
    setShowUser(false)
    setShowBooking(false)
    setShowHotel(false)
    setShowVisual(false)
    setEditUser(false)
    setShowAddHotel(!showAddHotel)
    setEditHotel(false)
  }

  const  handleEditHotel = (value) =>{
    setShowUser(false)
    setShowBooking(false)
     setShowHotel(false)
    setShowVisual(false)
    setShowAddHotel(false)
    setEditUser(false)
    setEditHotelDetails(value)
    setEditHotel(!editHotel)
  }

  const handleEditUser = (value) =>{
    setShowUser(false)
    setShowBooking(false)
     setShowHotel(false)
    setShowVisual(false)
    setShowAddHotel(false)
    setEditHotel(false)
   setEditUserDetails(value)
    setEditUser(!editUser)
  }
    return(
        <>
        <AdminContext.Provider value={{showUser,showHotel,showBooking,showVisual,showAddHotel,editHotel,editHotelDetails,editUser,editUserDetails,handleEditUser,handleEditHotel,handleShowAddHotel,handleShowUser, handleShowHotel, handleShowBooking, handleShowVisual}}>                                 
        {children} 
      </AdminContext.Provider> 
        </>
    )
}

export default AdminContextProvider;