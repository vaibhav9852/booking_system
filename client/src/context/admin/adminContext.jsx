import { createContext } from "react";

 const AdminContext = createContext({
   showUser:false,
   showHotel:false,
   showBooking:false,
   showVisual:false,
   showAddHotel:false,
   editHotel:false,
   editHotelDetails:{},
   editUser:false,
   editUserDetails:{},
   handleEditUser:()=>{},
   handleEditHotel: () =>{},
   handleShowUser: () => {},
   handleShowHotel: () => {},
   handleShowBooking: () => {},
   handleShowVisual: () => {}  ,
   handleShowAddHotel: () => {}
})

export default AdminContext;