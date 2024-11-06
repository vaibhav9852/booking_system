const {Schema} = require('mongoose')
const mongoose = require('mongoose')

const hotelSchema =  new Schema({
        name:{
            type: String,
            required: true,
            trim : true,
        },
        location:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String,
            trim: true 
        },
        charge:{
            type: String,
            required: true,
            trim: true
        },
        available:{
          type: Number 
        },

        image:{
            type:[{data:Buffer,type:String}] 
        },
        
})

const Hotel = mongoose.model('Hotel',hotelSchema)

module.exports = Hotel; 



