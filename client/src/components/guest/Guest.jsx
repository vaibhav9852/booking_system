import { useContext, useEffect, useState } from "react";
import BookingContext from "../../context/booking/BookingContext";


const Guest = () =>{
const bookingCtx =  useContext(BookingContext)
const [adult,setAdult] =  useState(bookingCtx.guest.adult || 0)
const [children,setChildren] =  useState(bookingCtx.guest.children || 0)

console.log('adult , children',adult,children)

    useEffect(()=>{
       bookingCtx.handleGuest({adult,children})
    },[adult,children])
    return(
        <>
        <div className="flex justify-center">
        <div className="absolute z-20 bg-white shadow-lg rounded-3xl p-4 w-96 h-48 mt-10  border border-gray-300">
            <div>

        <div className="flex justify-between px-4 ">
            <div>
            <label className="text-lg">Adults</label>
            <p className=" text-gray-400">Ages 13 or above</p>
            </div>

            <div className=" text-2xl">
            <button onClick={()=> setAdult(adult+1)} className="px-3"> + </button>
            {bookingCtx.guest.adult}
            <button onClick={()=> setAdult(adult <= 0 ? 0 : adult-1)} className="px-3">-</button>
            </div>

        </div>
        <div className=" w-full border-y-2 my-6"></div>
        <div className="flex justify-between px-4  ">
            <div>
            <label className="text-lg">Children</label>
            <p className=" text-gray-400">Ages 2-12</p>
            </div>

            <div className="text-2xl">
            <button onClick={()=> setChildren(children+1)} className="px-3">+</button>
            {bookingCtx.guest.children}
            <button onClick={()=> setChildren(children <= 0 ? 0 : children-1)}className="px-3">-</button>
        </div>
        </div>
 
        </div>

        </div>
        </div>

        
        </>
    )
}

export default Guest;