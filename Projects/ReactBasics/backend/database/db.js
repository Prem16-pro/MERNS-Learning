const mongoose = require('mongoose');
const dbConnect = async () =>{
    await mongoose.connect('mongodb+srv://fieldrentals69:8MWJfMaObxn4KSUc@cluster0.yrdwq.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0');
}



module.exports =  dbConnect;