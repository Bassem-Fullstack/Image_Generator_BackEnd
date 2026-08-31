


import mongoose, { model } from "mongoose";



const userSchema = new mongoose.Schema ({ 



username : {

type : String ,

trim : true ,

required : true 

} ,


email : {


 type : String ,

 trim : true ,

 required : true ,

 lowercase : true ,

 unique : true 

} ,


password : {

 type : String ,

 required : true ,

 minlength : 8 , 
 

} , 

attempts : {

type : Number ,

default : 0

} , 


lastAttemptsDate : {

  type : Date  ,

  default : null


}








} , {timestamps : true})






const User = mongoose.model("User" , userSchema)


export default User