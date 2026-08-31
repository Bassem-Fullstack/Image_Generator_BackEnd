

import mongoose from "mongoose";




const connectDB = async () => {


try {


await mongoose.connect(process.env.DB_URL)

console.log("MongoDB is connected")

}


catch(err) {


console.log("mongo DB doesn't connect")

}




}




export default connectDB