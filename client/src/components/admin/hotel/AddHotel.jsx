import { useState } from "react"
import { toast } from "react-toastify"
import { addHotel } from "../../../services/adminService"


const AddHotel = () => {
    const [hotel, setHotel] = useState({ name:'', location:'', description:'', charge:'', available:0, photos:[] })

    const handleChange = (event) => {
     
        let type = event.target.type 
        if(type == 'file'){
          setHotel({...hotel,'photos':[...event.target.files]})
        }else{
        setHotel({ ...hotel, [event.target.name]: event.target.value })
        }
    }
  console.log('hotel',hotel)
    const handleClick = async (event) => {
      event.preventDefault();
        console.log('hotel', hotel)

        if (hotel.name && hotel.location && hotel.charge) {
            let formData = new FormData()
            hotel.photos?.map((photo) => formData.append('photos', photo))
            formData.append('name', hotel.name)
            formData.append('location', hotel.location)
            formData.append('description', hotel.description)
            formData.append('charge', hotel.charge)
            formData.append('available', hotel.available)
            console.log('form data', formData)
            let data = await addHotel(formData)
            console.log('data after add hotel', data)

        } else {
            toast.error('fill hotel required field', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
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
                            <lable className="mx-4 font-semibold text-gray-600 text-xl">Available Room</lable>
                            <input type="number" name='charge' value={hotel.charge} placeholder="Enter Available Room" className="px-5 border-2 " onChange={(event) => handleChange(event)} />
                        </div>
                        <div className=" flex   py-4">
                            <lable className="mx-4 font-semibold text-gray-600 text-xl">Images</lable>
                            <input type="file"  multiple value={hotel.image} className="px-40  text-white " onChange={(event) => handleChange(event)} />
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