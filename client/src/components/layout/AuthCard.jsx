import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import { signOut } from "../../services/authService";


const AuthCard = (props) =>{
const authCtx = useContext(AuthContext)
 const cardRef = useRef(null) 
 const navigate = useNavigate()
  const handleSignOut = async () =>{

   props.updateFun(false)
   authCtx.signOut()
   navigate('/signin')
    //  let response = await signOut()
    //  console.log('response',response)
    //  if(response.success){
    //         authCtx.signOut()
    //         navigate('/signin')
    //  }
  }
    return(
        <>
        <div className="flex justify-end">
        <div className={`absolute z-20 bg-white shadow-lg rounded-xl p-4 w-60  mt-2  border border-gray-300 ${authCtx.user?.verified ? 'h-40' : 'h-30'}`}>
        
        {!authCtx.user?.verified &&       <div className="py-2   rounded-md hover:bg-gray-200 transition duration-300"><Link to='/signup' onClick={() => props.updateFun(false)}>Sign up</Link></div> }
          {!authCtx.user?.verified &&     <div className="py-2 rounded-md hover:bg-gray-200 transition duration-300 "><Link to='/signin' onClick={() => props.updateFun(false)}>Log in</Link></div> }
          {authCtx.user?.verified &&    <div className="py-2 rounded-md hover:bg-gray-200 transition duration-300"><Link to='/profile' onClick={() => props.updateFun(false)}>Profile</Link></div> }
         {/* {authCtx.user?.verified && <div className="py-2 rounded-md hover:bg-gray-200 transition duration-300" onClick={() => handleSignOut()}><Link to='/profile' onClick={() => props.updateFun(false)}>Log out</Link></div> } */}
         {authCtx.user?.verified && <div className="py-2 rounded-md hover:bg-gray-200 transition duration-300" onClick={() => handleSignOut()}>Log out</div> }
         { (authCtx.user?.verified && authCtx.user?.role == 'admin')  && <div className="py-2 rounded-md hover:bg-gray-200 transition duration-300"><Link to='/admin' onClick={() => props.updateFun(false)}>Admin</Link></div> }

        </div>
        </div>
        </>
    )
}

export default AuthCard;