import { Children, useState } from "react";
import AuthContext from "./AuthContext";
import { json } from "react-router-dom";


const AuthContextProvider = (props) =>{
   const loginUser = JSON.parse(localStorage.getItem('user'))
 const [user,setUser] = useState(loginUser?.user)
 const signIn = (user) =>{
   setUser(user)
 }

 const signOut = () =>{
    setUser(null)
    localStorage.clear();
 }
 
    return(
        <>
        <AuthContext.Provider value={{user,signIn,signOut}}>
           {props.children}
        </AuthContext.Provider>
        </>
    )
}

export default AuthContextProvider;