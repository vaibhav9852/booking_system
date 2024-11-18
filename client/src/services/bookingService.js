 import {API_BASE_URL} from ".././config"
  const token = JSON.parse(localStorage.getItem('token'))
 const URL = API_BASE_URL //'http://localhost:8005/v1/bookings' 
 
export const createBooking = async (data) =>{
   
    let response = await fetch(`${URL}/bookings`,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
           'authorization' : `Bearer ${token}`
        },
        body : JSON.stringify(data)  
      })

    let bookings =  await response.json()

    return bookings ? bookings : ''

}