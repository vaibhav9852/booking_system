import { useContext } from "react"
import AuthContext from "../../context/auth/AuthContext"
import { Link } from "react-router-dom"

const Profile = () =>{

    const authCtx = useContext(AuthContext)
    console.log('autCtx',authCtx)
    return(
        <>
      
        <div className="flex justify-center items-center p-10">
            <div className="flex flex-col justify-around p-10 h-96 w-96 shadow-lg bg-white">
            <h2 class="text-xl font-semibold text-center text-gray-800 mb-6">User Profile</h2>
               <div className="flex">
                <div className="text-gray-600 font-medium">Name</div>
                <div className="px-5">{authCtx.user?.name}</div>
               </div>

               <div className="flex">
               <div className="text-gray-600 font-medium">Email</div>
               <div className="px-5">{authCtx.user?.email}</div>
               </div>

               <div className="flex">
               <div className="text-gray-600 font-medium">Role</div>
               <div className="px-5">{authCtx.user?.role}</div>

               </div>
               <div className="flex justify-center">
            <p className=" font-medium rounded-lg bg-gray-300 px-2 mt-10"><Link to='/profile/edit'>Edit Profile</Link></p>
        </div>
            </div>
   
        </div>
     
        </>
    )
}

export default Profile