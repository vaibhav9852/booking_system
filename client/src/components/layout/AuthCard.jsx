import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";


const AuthCard = (props) =>{
const authCtx = useContext(AuthContext)
 const cardRef = useRef(null) 
 
    return(
        <>
        <div className="flex justify-end">
        <div className="absolute z-20 bg-white shadow-lg rounded-xl p-4 w-60 h-60 mt-2  border border-gray-300">
        
        {!authCtx.user &&       <div className="py-2   rounded-md hover:bg-gray-200 transition duration-300"><Link to='/signup' onClick={() => props.updateFun(false)}>Sign up</Link></div> }
          {!authCtx.user &&     <div className="py-2 rounded-md hover:bg-gray-200 transition duration-300 "><Link to='/signin' onClick={() => props.updateFun(false)}>Log in</Link></div> }
          {authCtx.user &&    <div className="py-2 rounded-md hover:bg-gray-200 transition duration-300"><Link to='/profile' onClick={() => props.updateFun(false)}>Profile</Link></div> }
         {authCtx.user && <div className="py-2 rounded-md hover:bg-gray-200 transition duration-300" onClick={() => authCtx.signOut()}><Link to='/profile' onClick={() => props.updateFun(false)}>Log out</Link></div> }

        </div>
        </div>
        </>
    )
}

export default AuthCard;