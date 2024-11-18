import {API_BASE_URL} from ".././config"
const token = JSON.parse( localStorage.getItem('token'))
const URL = API_BASE_URL 




export const deleteUser = async (id) => {
    let response = await fetch(`${URL}/user/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
             'authorization' : `Bearer ${token}`
        }
    })
    let data = await response.json()
   return data ? data : ''
}


export const getUsers = async () =>{
    let response = await fetch(`${URL}/user`,{
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    let data = await response.json()
   return data ? data : ''

   
}


export const addHotel = async (formData) =>{
   let response = await fetch(`${URL}/hotels`,{
    method:'POST',
    body : formData,
    headers:{
         'authorization' : `Bearer ${token}`
    }
   })
   let data = await response.json()

   return data ? data : ''
}

export const getHotels = async () =>{
    let response = await fetch(`${URL}/hotels/all`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
             'authorization' : `Bearer ${token}`
        }
    })

    let data = await response.json()
    return data ? data : ''
}

export const editHotel = async (id,formData) =>{

    let response = await fetch(`${URL}/hotels/${id}`,{
        method:'PUT',
        body: formData,
        headers:{
             'authorization' : `Bearer ${token}`
        }
    })
    let data = await response.json()
    return data ? data : '' 
}

export const deleteHotel = async (id) =>{
    let response = await fetch(`${URL}/hotels/${id}`,{
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
             'authorization' : `Bearer ${token}`
        }
    })
    let data = await response.json()
    return data ? data : ''

}

export const getBookins = async () =>{
  let response = await fetch(`${URL}/bookings`,{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
         'authorization' : `Bearer ${token}`
    }
  })
  let data = await response.json()

  return data ? data : ''
}

