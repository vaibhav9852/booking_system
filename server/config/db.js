const mongoose = require('mongoose')

async function connectToDB(){
    const {MONGO_URI} = process.env;
    try{
  let dbInstance =    await mongoose.connect(MONGO_URI)
  console.log('db connected',)
    }catch(err){
        console.log('database connection error',err)
    }
}

module.exports = connectToDB;