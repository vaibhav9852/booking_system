// import { v2 as cloudinary } from 'cloudinary';
const {v2} = require('cloudinary');
const Hotel = require('../models/hotel.model.js');


async function upload(url) {
    const { CLOUD_NAME , API_KEY, API_SECRET, CLOUDINARY_URL} = process.env
    // Configuration
    v2.config({ 
        cloud_name: CLOUD_NAME, 
        api_key: API_KEY, 
        api_secret: API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    // Upload an image
     const uploadResult = await v2.uploader
       .upload(
           `${url}`, 
       )
       .catch((error) => {
           console.log(error);
       });
    
  //  console.log(uploadResult);
    return  uploadResult.url;
}


// add hotel 

exports.addHotel = async (req,res) =>{ 
    const {name,description,location,charge,available,features,coordinates} = req.body                                                                                            
    console.log('coordinates...',coordinates) 
    const data = req.files
    try{
   if(name && location && charge && data && available){
    Promise.all( data.map((image) => upload(image.path)))
    .then( async (urls) => {
        let hotel = await Hotel.create({
            name,
            description,
            location,
            charge,
            image:urls,
            available,
            features:features.split(','),
            coordinates: coordinates.split(',')
        })
        res.status(201).json({success:true,message:'hotel added',data:hotel})
    })
   
}else{
    res.status(400).json({success:true,message:'importent filled are required'})
}
}catch(err){
    res.status(500).json({success:false,message:'Internal server error'})
} 

}

exports.getHotels = async (req,res) =>{
    try{
      let hotels = await Hotel.find();
    res.status(200).json({success:true,data:hotels})
    }catch(err){
        res.status(500).json({success:false,message:`Internal error : ${err}`})
    }
}

exports.getHotel = async (req,res) =>{
  let {id} = req.params
  console.log('id...',id)

  try{
   let hotel = await Hotel.findById(id)
   //console.log('hotel',hotel)
   res.status(200).json({success:true,data:hotel})
   
  }catch(err){ 
    res.status(500).json({success:false,message:'Internal server error'})
  }
}


exports.updateHotel = async (req,res) =>{
    const {name,description,location,charge,available,features,coordinates} = req.body
   const {id} = req.params 
    const data = req.files
     // let imgURL ;
      console.log('data', typeof data , data, features,coordinates)
      console.log('req.body', req.body)
    //  const urls =   data.map( async (image) => await  upload(image.path))
   console.log('update id',id)
      try{
        if(name && location && charge && data && available){
      Promise.all( data?.map((image) => upload(image.path)))
      .then( async (urls) => {
          let hotel = await Hotel.findByIdAndUpdate(id,{
              name,
              description,
              location,
              charge,
              image:urls,
              available,
              features: features.split(','),
              coordinates: coordinates.split(',')
          })
          res.status(201).json({success:true,message:'hotel added',data:hotel})
      })
    }else{
       throw new Error('data missing')  
    }
    }catch(err){
        console.log('update error',err)
        res.status(500).json({success:false,message:'Internal server error while update hotel'})
    }
    
}

exports.deleteHotel = async (req,res) =>{
    let {id} = req.params
    try{
  let hotel = await Hotel.findByIdAndDelete(id)
   res.status(200).json({success:true,hotel})
    }catch(err){
     res.status(500),json({success:false,message:'Internal server error while delete hotel'})
    }
}