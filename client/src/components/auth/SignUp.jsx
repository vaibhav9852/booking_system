import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth/AuthContext";
const URL = `http://localhost:8005/v1/user/signup`

const SignUp = () =>{
    
 const [user,setUser] = useState({name:'',email:'',password:''})
 const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
 const emailRegex =   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
 const navigate = useNavigate()
 const authCtx = useContext(AuthContext) 

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(!user.name || user.name.length<6){
            toast.error('Invalid user name', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
        }
         else if(!passwordRegex.test(user.password)){
            toast.error('Invalid password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
         }else if(!emailRegex.test(user.email)){
            toast.error('Invalid email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
         }else{
         try{
        const response = await fetch(`${URL}`,{
            method:'POST',
            body: JSON.stringify(user),
            headers: {'Content-Type':'application/json'}
        })
        const data = await response.json()
   
         if (data.success) {
            setUser({ email: '', password: '' })
            toast.success('Signup successful. Please check your email for verification link', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
            navigate('/')
        }else{
            toast.error(`User already exist`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
        }
        setUser({name:'',email:'',password:''})
       
    }catch(err){
        toast.error('Invalid credential', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
    }
}
    }

    const handleChange = (event) =>{
        setUser({...user,[event.target.name]:event.target.value})
    }

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
                <input type="submit" className="bg-blue-500 items-center p-2 text-slate-200   rounded-lg my-4 hover:bg-blue-600" />
                </div>
            </form>
        </div>
        </>
    )
}

export default SignUp;