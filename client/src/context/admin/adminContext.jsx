import { createContext } from "react";

 const AdminContext = createContext({
   showUser:false,
   showHotel:false,
   showBooking:false,
   showVisual:false,
   showAddHotel:false,
   editHotel:false,
   editHotelDetails:{},
   handleEditHotel: () =>{},
   handleShowUser: () => {},
   handleShowHotel: () => {},
   handleShowBooking: () => {},
   handleShowVisual: () => {}  ,
   handleShowAddHotel: () => {}
})

export default AdminContext;