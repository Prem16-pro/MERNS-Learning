const mongoose = require('mongoose');
require('dotenv').config();

const dbUri = process.env.MONGODBURI;

const dbConnect = async () =>{
    await mongoose.connect(dbUri);
}



module.exports =  dbConnect;