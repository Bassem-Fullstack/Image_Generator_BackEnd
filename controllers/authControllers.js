


import User from "../models/User.js";

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler"



const register = asyncHandler( async ( req , res) => {


 const {username , email , password} = req.body 
 
   if (!username || !email || !password) {

      return res.status(400).json({ error: "All fields are required" })
      
    }


 const getUser = await User.findOne({ email }) 


 if(getUser) {


 return res.status(400).json({ message : "User is already exist , please login" })

 }



const hashPassword = await bcrypt.hash(password , 10) 



 const createUser = await User.create({

  username ,

  email ,

  password : hashPassword


 })


res.status(201).json({

user : {

 id : createUser._id ,

 email : createUser.email ,

 username : createUser.username ,


}



})



})




/////////////////////////////////////////////////////////////////////////////




const login = asyncHandler(async (req , res) => {


const { email , password} = req.body 

   if (!email || !password) {

      return res.status(400).json({ error: "All fields are required" })
      
    }

const getUser = await User.findOne({ email })


if(!getUser) {

return res.status(400).json({ message : "Invalid  email or password" })

}


const IsMatch = await bcrypt.compare(password , getUser.password) 


if(!IsMatch) {

return res.status(400).json({ message : "Invalid email or password" })

}


const token = jwt.sign(

{userID : getUser._id} ,


process.env.Secret_Key_Token ,


{expiresIn : "10d"}


)




res.status(200).json({ 

 
    user : {
       

       id : getUser._id ,
       
       email : getUser.email ,

       token


    }



 })




})




///////////////////////////////////////////////////////////////////////////////////


const logout = asyncHandler (async (req , res) => {


  res.status(200).json({ message : "Logged out successfully"})  


})



export { login , register , logout }

