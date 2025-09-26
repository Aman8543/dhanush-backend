const mongoose = require("mongoose");
require('dotenv').config();
const database = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_STRING}`);
    }
    catch(err){
        console.log("error in mongodb : " + err);
    }
}

module.exports = database;