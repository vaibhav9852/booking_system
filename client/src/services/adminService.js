
const URL = 'http://localhost:8005/v1'

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
    let response = await fetch(`${URL}/user`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
    let data = await response.json()
   return data ? data : ''
}

export const hotels = async () =>{
    let response = await fetch(`${URL}/hotel`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })

    let data = await response.json()
    return data ? data : ''
}

export const editHotel = async (id) =>{

    let response = await fetch(`${URL}/hotel/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        }
    })
    let data = await response.json()
    return data ? data : ''
}

export const deleteHotel = async (id) =>{
    let response = await fetch(`${URL}/hotel/${id}`,{
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    let data = await response.json()
    return data ? data : ''

}

