import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { addHotel } from "../../../services/adminService"
import SelectLocation from "../../common/map/SelectLocation"
import BookingContext from "../../../context/booking/BookingContext"


const AddHotel = () => {
    const [hotel, setHotel] = useState({ name:'', location:'', description:'', charge:'', available:10, photos:[] , coordinates:[] })                                                                                                                 
    const [feature,setFeature] = useState([])
 
    const bookingCtx = useContext(BookingContext) 
    const handleChange = (event) => {
     
        let type = event.target.type 
        if(type == 'file'){
          setHotel({...hotel,'photos':[...event.target.files]})
        }else{
        setHotel({ ...hotel, [event.target.name]: event.target.value })
        }
    }
  
    const handleClick = async (event) => {
      event.preventDefault();
      if ((!hotel.name.trim().length && !hotel.location.trim().length) && !hotel.charge) {
        toast.error('Something went wrong while add hotel', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
      }
      
        if (hotel.name.trim().length && hotel.location.trim().length && hotel.charge) {
            let formData = new FormData()
            hotel.photos?.map((photo) => formData.append('photos', photo))
            formData.append('name', hotel.name)
            formData.append('location', hotel.location)
            formData.append('description', hotel.description)
            formData.append('charge', hotel.charge)
            formData.append('available', hotel.available)
            formData.append('features',[...feature])
            formData.append('coordinates',bookingCtx.mapLocation) 
            setHotel({ name:'', location:'', description:'', charge:'', available:0, photos:[] })
            let data = await addHotel(formData)
            
          
            if(data.success){
                toast.success('Hotel added', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                });
                setFeature([])
            }else{
                toast.error('Something went wrong while add hotel', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                });
            }


        } else {
            toast.error('Please fill hotel details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
        }
    }

    const handleCheckChange = (event) =>{
      const { value, checked } = event.target;    
       if(checked){
          setFeature([...feature,value]) 
       }else{
         let filterFeature = feature.filter((item) => item != value)
         setFeature(filterFeature) 
       }
   
    }

    return (
        <>
            <div className="flex  justify-center items-center py-2">
                <div className=" w-3/5 h-max shadow-lg mt-10">
                    <div className=" text-2xl font-bold text-center my-10">Add Hotel</div>
                    <form encType="multipart/form-data" className=" flex flex-col justify-center  mx-6">
                        <div className=" flex justify-between py-4">
                            <lable className="mx-4 font-semibold text-gray-600 text-xl">Name</lable>
                            <input type="text" name='name' value={hotel.name} placeholder="Enter hotel name" className="px-5 border-2 " onChange={(event) => handleChange(event)} />
                        </div>
                        <div className="  flex justify-between py-4">
                            <lable className="mx-4 font-semibold text-gray-600 text-xl">Location</lable>
                            <input type="text"  name='location' value={hotel.location} placeholder="Enter hotel Location" className="px-5 border-2 " onChange={(event) => handleChange(event)} />
                        </div>
                        <div className=" flex justify-between py-4">
                            <lable className="mx-4 font-semibold text-gray-600 text-xl">Description</lable>
                            <input type="text" name='description' value={hotel.description} placeholder="Enter hotel Description" className="px-5 border-2 " onChange={(event) => handleChange(event)} />
                        </div>
                        <div className=" flex justify-between py-4">
                            <lable className="mx-4 font-semibold text-gray-600 text-xl">Charge</lable>
                            <input type="number" name='charge' value={hotel.charge} placeholder="Enter room charge" min={0}  className="px-5 border-2 " onChange={(event) => handleChange(event)} />
                        </div>
                        <div className=" flex justify-between  py-4">
                            <lable className="mx-4 font-semibold text-gray-600 text-xl">Features</lable>
                          
                              <div className="w-48 flex justify-start"> 
                              <table className="table-auto border-separate ">
                                <tbody>
                                    <tr>
                                        <td> <label>Beach</label></td>
                                        <td> <input type="checkbox" value='beach'  name='beach' onChange={(e) => handleCheckChange(e)} /></td>
                                    </tr>
                                    <tr>
                                        <td> <label>Goalf</label></td>
                                        <td> <input type="checkbox" value='goalf'  name='goalf' onChange={(e) => handleCheckChange(e)} /></td>
                                    </tr>
                                    <tr>
                                        <td> <label>Cabin</label></td>
                                        <td> <input type="checkbox" value='cabin'  name='cabin' onChange={(e) => handleCheckChange(e)} /></td>
                                    </tr>
                                    <tr>
                                        <td> <label>Pool</label></td>
                                        <td> <input type="checkbox" value='pool'  name='pool' onChange={(e) => handleCheckChange(e)} /></td>
                                    </tr>
                                </tbody>
                              </table>
                              </div>
                        </div>
                        <div className=" flex  justify-between py-4">
                            <lable className="mx-4 font-semibold text-gray-600 text-xl">Images</lable>
                          <div className="px-5 w-60">  <input type="file"  multiple value={hotel.image} className=" text-white " onChange={(event) => handleChange(event)} /> </div>
                        </div>
                        <div className=" flex  justify-between  py-8">
                            <lable className="mx-4 font-semibold text-gray-600 text-xl">Select Location</lable>
                            <div className="  w-60">
                             <SelectLocation />
                            </div>
                        </div>
                        <div className=" flex justify-center py-4">
                            <button onClick={(event) => handleClick(event)} className=" text-white bg-blue-500 p-3 rounded-lg mt-4">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddHotel;