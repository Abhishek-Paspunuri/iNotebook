var mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1";


const connectToMongo =() =>{
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose successfully");
    })
}

module.exports = connectToMongo;