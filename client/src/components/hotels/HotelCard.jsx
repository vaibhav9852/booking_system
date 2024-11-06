import {Link} from 'react-router-dom'

const HotelCard =  ({hotel}) =>{

    return(
        <>
     
        <div className="flex  w-64 h-1/6  p-4 m-1 flex-col justify-center items-center ">
        <Link to={`/rooms/${hotel._id}`}>
         <img src={`${hotel?.image[0]}`} alt="img" className="w-64  h-52 border-gray-100 rounded-xl"/>
          <div className="my-2">
          <div className="  text-base font-bold">{hotel.name}</div>
          <div className="text-sm font-light">{hotel.description}</div> 
          <div className="mt-2 text-sm font-bold ">
          
       <span>&#8377;{hotel.charge} night  </span>   </div>
          </div>
          </Link>
        </div>
     
        </>
    )
} 



export default HotelCard ;