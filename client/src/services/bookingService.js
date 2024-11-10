  const URL = 'http://localhost:8005/v1/bookings' 
export const createBooking = async (data) =>{
   
    let response = await fetch(URL,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)  
      })

    let bookings =  await response.json()

    return bookings ? bookings : ''

}