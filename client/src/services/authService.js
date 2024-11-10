const URL = 'http://localhost:8005/v1'
const token = JSON.parse(localStorage.getItem('token')) || null;

export const editProfile = async(id,data) => {
 
    let response = await fetch(`${URL}/user/${id}`,{
        method:'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })

    let respData = await response.json()

    return respData;
}

export const forgotPassword = async (email) =>{
     
    let response = await fetch(`${URL}/auth/forgot-password`,{
        method:'POST',
        body: JSON.stringify({email}),
        headers:{
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })

    let respData = await response.json()
    return respData;
}

export const resetPassword = async (token,password) =>{
     
    let response = await fetch(`${URL}/auth/reset-password/${token}`,{
        method:'POST',
        body: JSON.stringify({password}),
        headers:{
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })

    let respData = await response.json()
    return respData;
}