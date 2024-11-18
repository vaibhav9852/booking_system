import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import AdminContext from "../../../context/admin/adminContext";
import { editProfile } from "../../../services/authService";
const URL =  `${API_BASE_URL}/user/signup` //http://localhost:8005/v1/user/signup`

const EditUser = () =>{
 const [user,setUser] = useState({name:'',email:'',password:''})
 const [error,setError] = useState(null)
editProfile
 const navigate = useNavigate()
 const adminCtx = useContext(AdminContext)
    const handleSubmit = async (event) =>{
        event.preventDefault();
          console.log('adminCtx.editUserDetails',adminCtx.editUserDetails)
         try{
          let data = await editProfile(adminCtx.editUserDetails?._id,user)
          authCtx.signIn(data.user)
          toast.success('Profile updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
        setUser({name:'',email:'',password:''})
        navigate('/')
    }catch(err){
        toast.error('Something wrong while edit profile', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
    }
    }

    const handleChange = (event) =>{
      
        setError('')
        setUser({...user,[event.target.name]:event.target.value})
       
    }

    useEffect(()=>{
     const {name,email,password,role} = adminCtx.editUserDetails
      setUser({name,email,password})
    },[])

    return(
        <>
        <div className="flex w-full  items-center justify-center">
            <form onSubmit={handleSubmit}>
                <div className="mx-4 p-4 w-96">
                <label className="mx-6">Name</label>
                <input type="text" name='name' value={user.name} placeholder="name" minLength={2} maxLength={20} required onChange={handleChange} className="border-4 rounded-md p-2 w-96" />
                </div>

                <div className="mx-4 p-4 w-96">
                <label className="mx-6">Email</label>
                <input type="email" name='email' value={user.email} placeholder="email" required onChange={handleChange} className="border-4 rounded-md p-2 w-96"/>
                </div>

                <div className="mx-4 p-4 w-96">
                <label className="mx-6">Password</label>
                <input type="password" name='password' value={user.password} placeholder="password" minLength={6} maxLength={10} required onChange={handleChange} className="border-4 rounded-md p-2 w-96"/>
                </div>

                <div className="flex  justify-center items-center">
                <input type="submit" value={'Edit Profile'} className="bg-blue-500 items-center p-2 text-slate-200   border-4 rounded-md my-4" />
                </div>
            </form>
        </div>
        </>
    )
}

export default EditUser;