import {Link} from 'react-router-dom'
import ImageSlider from '../common/ImageSlider';

const HotelCard =  ({hotel}) =>{

    return(
        <>
     
        <div className="flex  w-64 h-1/6  p-4 m-1 flex-col justify-center items-center ">
     
         {/* <img src={`${hotel?.image[0]}`} alt="img" className="w-64  h-52 border-gray-100 rounded-xl"/> */}
         <ImageSlider images={hotel?.image} height={'h-56'}/>
         <Link to={`/rooms/${hotel._id}`}>
          <div className="my-2">
          <div className="text-base  font-bold">{hotel.name?.split(' ').slice(0,4).join(' ')}</div>
          <div className="text-sm font-light">{hotel.description?.split(' ').slice(0,4).join(' ')}</div> 
          <div className="mt-2  text-sm font-bold ">
          
       <span>&#8377;{hotel.charge} night  </span>   </div>
          </div>
          </Link>
        </div>
     
        </>
    )
} 



export default HotelCard ;