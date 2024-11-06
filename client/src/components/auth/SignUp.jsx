import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const URL = `http://localhost:8005/v1/user/signup`

const SignUp = () =>{
 const [user,setUser] = useState({name:'',email:'',password:''})


 const navigate = useNavigate()
    const handleSubmit = async (event) =>{
        event.preventDefault();
         try{
        const response = await fetch(`${URL}`,{
            method:'POST',
            body: JSON.stringify(user),
            headers: {'Content-Type':'application/json'}
        })
        const data = await response.json()
        
        toast.success('Successfully sign up', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
       
        setUser({name:'',email:'',password:''})
        navigate('/signin')
    }catch(err){
        toast.error('Invalid credential', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
    }
    }

    const handleChange = (event) =>{
        setUser({...user,[event.target.name]:event.target.value})
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
                <input type="submit" className="bg-blue-500 items-center p-2 text-slate-200   border-4 rounded-md my-4" />
                </div>
            </form>
        </div>
        </>
    )
}

export default SignUp;