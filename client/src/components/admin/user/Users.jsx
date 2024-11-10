import { useEffect, useState } from "react";
import { deleteUser, getUsers} from '../../../services/adminService'
import { toast } from "react-toastify";


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
          let response = await  deleteUser(id)
          console.log('response',id,response)
          if(response.success){
            
            toast.success('user deleted ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
          }else{
            toast.error('Something wrong while delete user', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
          }
    }

    return(
        <>
        <div className=" flex  justify-center  items-center py-8">
         <table className="table-auto border-separate border-spacing-8 ">
            <tbody>
           { users && users.map((user) =>(
            <tr className=" my-10 mx-10 " key={user._id}>
               <td className=" my-2 text-lg font-bold py-2 ">{user.name}</td>
               <td className="  my-2 text-base font-bold py-2">{user.email}</td>
               <td className="  text-center my-2 px-2 text-lg font-bold  shadow-lg  rounded-lg text-white bg-gray-500" > <button onClick={(e) => handleEdit(e,user._id)}> Edit </button></td>
               <td className="  text-center  my-2 px-2 text-lg font-bold  shadow-lg rounded-lg text-white bg-red-500"><button onClick={(e) => handleDelete(e,user._id)}>Delete</button></td>                                             
               </tr>
))  
    }
    </tbody>
    </table>
        </div>
        </>
    )
}

export default Users;