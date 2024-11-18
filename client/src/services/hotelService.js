import {API_BASE_URL} from ".././config"
const URL = `${API_BASE_URL}` // 'http://localhost:8005/v1/hotels'
// const token = JSON.parse(localStorage.getItem('token'))
export const getHotels = async (pageNum)=>{
  
  let response = await fetch(`${URL}/hotels?page=${pageNum}`,{
    method:'GET',
    headers: {
      'Content-Type':'application/json',
    }
  })
  let hotels = await response.json() 
  return hotels;
}

export const getHotel = async (id) =>{

    let response = await fetch(`${URL}/hotels/${id}`,{
      method:'GET',
      headers: {
        'Content-Type':'application/json',
      }
    })
    let hotel = await response.json()
    return  hotel;
}



