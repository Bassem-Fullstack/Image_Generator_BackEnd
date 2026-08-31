


import "dotenv/config"

import express from "express"

import cors from "cors"

import connectDB from "./config/db.js"

import authRoutes  from "./routes/authRoutes.js"

import imageRoutes from "./routes/generate.js"




connectDB()

const port = process.env.PORT || 5000


const app = express()


app.use(express.json())

app.use(cors({

origin : (origin , callback) => {


   if (!origin) {
      return callback(null, true);
    }

if(origin.includes("http://localhost") || origin.endsWith(".vercel.app")) {


callback( null , origin )


}

else {
 
callback(new Error ("Not allowed by CORS") , false)

} 



},

credentials : true 

}

))

app.get("/" , (req , res) => {


res.send("server is working well")


})





app.use("/users" , authRoutes) 

app.use("/images" , imageRoutes)



app.listen(port , () => {


console.log("server is working well")

})


















