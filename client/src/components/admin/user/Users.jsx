import { useEffect, useState } from "react";
import { getUsers} from '../../../services/adminService'


const Users = () =>{

    const [users,setUsers] = useState()

    const fetchUser = async () =>{
       let data = await getUsers()
       console.log('fetchUser data',data)
       setUsers(data.users)
    }
    useEffect(()=>{
      fetchUser()
    },[])

    const  handleDelete = async (e,id) =>{
            e.preventDefault()
            let response = await fetch()
    }

    return(
        <>
        <div className=" flex flex-col justify-center  items-center py-8">
         { users && users.map((user) =>(
            <div className="flex justify-around w-full  p-4" key={user._id}>
               <div className=" text-lg font-bold py-2 ">{user.name}</div>
               <div className=" text-base font-bold py-2">{user.email}</div>
               <div className=" text-lg font-bold p-3 shadow-lg  rounded-lg text-white bg-gray-500">Edit</div>
               <div className=" text-lg font-bold p-3 shadow-lg rounded-lg text-white bg-red-500" onClick={(e) => handleDelete(e,user._id)}>Delete</div>                                             
               </div>
))  
    }
        </div>
        </>
    )
}

export default Users;