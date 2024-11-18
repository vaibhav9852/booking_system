import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AuthContext from "../../context/auth/AuthContext";
import {API_BASE_URL} from "../.././config"

const SignIn = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const authCtx = useContext(AuthContext)

    //const URL = `http://localhost:8005/v1/user/signin`
    const navigate = useNavigate() 
    const handleChange = (event) => {
        setUser({ ...user, [event.target.type]: event.target.value })
    }   

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (user.email.trim().length && user.password.trim().length) {
                const response = await fetch(`${API_BASE_URL}/user/signin`, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: { 'Content-Type': 'application/json' }
                })
                const data = await response.json()
                if (data.success) {
                    authCtx.signIn(data.data)
                    localStorage.setItem('user', JSON.stringify(data.data))
                    localStorage.setItem('token',JSON.stringify(data.token))
                    setUser({ email: '', password: '' })
                    toast.success('Successfully logged in', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                    });
                    navigate('/')
                } else {
                    throw new Error('Invalid email or password')
                }
            } else {
         
                throw new Error('Invalid email or password')
            }
        } catch (err) {
           
            toast.error('Invalid email or password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
        }
    }
    return (
        <>
            <div>
                <div className="flex w-auto justify-center items-center">
                    <form onSubmit={handleSubmit}>
                        <div className="mx-4 p-4 w-96">
                            <lable className="mx-6">Email</lable>
                            <input type="email" value={user.email} placeholder="email" required onChange={handleChange} className="border-4 rounded-md p-2 w-96" />
                        </div>
                        <div className="mx-4 p-4 w-96">
                            <label className="mx-6">Password</label>
                            <input type="password" value={user.password} placeholder="password" minLength={6} maxLength={16} onChange={handleChange} className="border-4 rounded-md p-2 w-96" />
                           <Link to="/forgot-password"> <p className=" font-semibold text-sm pt-2">Forgot password</p></Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <input type="submit" className="bg-blue-500 items-center p-2 text-slate-200   rounded-lg my-4 hover:bg-blue-600" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn;

