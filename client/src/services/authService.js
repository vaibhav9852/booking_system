const URL = 'http://localhost:8005/v1/user'
const token = JSON.parse(localStorage.getItem('token')) || null;

export const editProfile = async(id,data) => {
 
    let response = await fetch(`${URL}/${id}`,{
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