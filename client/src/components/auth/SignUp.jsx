import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth/AuthContext";
const URL = `http://localhost:8005/v1/user/signup`

const SignUp = () =>{
    
 const [user,setUser] = useState({name:'',email:'',password:''})
 const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
 const emailRegex =    /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
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
         console.log('data sigup',data)
         if (data.success) {
            authCtx.signIn(data.user)
            localStorage.setItem('user', JSON.stringify(data))
            setUser({ email: '', password: '' })
            toast.success('Successfully sign up and sign in', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
        }
        setUser({name:'',email:'',password:''})
        navigate('/')
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