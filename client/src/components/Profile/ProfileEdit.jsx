import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import { editProfile } from "../../services/authService";

const URL = `http://localhost:8005/v1/user/signup`

const ProfileEdit = () =>{
    const authCtx = useContext(AuthContext)
 const [user,setUser] = useState({name:authCtx.user?.name,email:authCtx.user?.email,password:''})
 const [error,setError] = useState(null)

 const navigate = useNavigate()
    const handleSubmit = async (event) =>{
        event.preventDefault();
         try{
          let data = await editProfile(authCtx.user?._id,user)
          authCtx.signIn(data.user)
        alert('Profile edit successful')
        setUser({name:'',email:'',password:''})
        navigate('/')
    }catch(err){
        console.log('signup err',err)
    }
    }

    const handleChange = (event) =>{
        // event.preventDefault();
        console.log('ev',event.target)
        setError('')
        setUser({...user,[event.target.name]:event.target.value})
        console.log('user',user)
    }

    return(
        <>
        <div className="flex w-full  items-center justify-center">
            {/* <div className=" flex  flex-col">
            
            </div> */}
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

export default ProfileEdit;