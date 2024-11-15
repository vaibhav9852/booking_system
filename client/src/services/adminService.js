const token = JSON.parse( localStorage.getItem('token'))
console.log('token in admin',token) 
const URL = 'http://localhost:8005/v1'
// import axios from 'axios'

export const deleteUser = async (id) => {
    let response = await fetch(`${URL}/user/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
    let data = await response.json()
   return data ? data : ''
}


export const getUsers = async () =>{
    console.log('token...',token)
    let response = await fetch(`${URL}/user`,{
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    let data = await response.json()
    console.log('data',data) 
   return data ? data : ''
  //  credentials: 'include',
   
}


export const addHotel = async (formData) =>{
   let response = await fetch(`${URL}/hotels`,{
    method:'POST',
    body : formData,
    // headers : {
    //     'Content-Type' : 'multipart/form-data'
    // }
   })
   let data = await response.json()

   return data ? data : ''
}

export const getHotels = async () =>{
    let response = await fetch(`${URL}/hotels`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })

    let data = await response.json()
    return data ? data : ''
}

export const editHotel = async (id,formData) =>{

    let response = await fetch(`${URL}/hotels/${id}`,{
        method:'PUT',
        body: formData
    })
    let data = await response.json()
    return data ? data : '' 
}

export const deleteHotel = async (id) =>{
    let response = await fetch(`${URL}/hotels/${id}`,{
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    let data = await response.json()
    return data ? data : ''

}

export const getBookins = async () =>{
  let response = await fetch(`${URL}/bookings`)
  let data = await response.json()

  return data ? data : ''
}

