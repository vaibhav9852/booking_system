
const URL = 'http://localhost:8005/v1/hotels'
// const token = JSON.parse(localStorage.getItem('token'))
export const getHotels = async (pageNum)=>{
  
  let response = await fetch(`${URL}?page=${pageNum}`,{
    method:'GET',
    headers: {
      'Content-Type':'application/json',
    }
  })
  let hotels = await response.json() 
  return hotels;
}

export const getHotel = async (id) =>{
  console.log('hit id',id)
    let response = await fetch(`${URL}/${id}`,{
      method:'GET',
      headers: {
        'Content-Type':'application/json',
      }
    })
    let hotel = await response.json()
    return  hotel;
}

//     'authorization':`Bearer ${token}`

