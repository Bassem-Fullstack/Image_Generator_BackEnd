


import mongoose from "mongoose";



const imageSchema = new mongoose.Schema({   


user : {


 type : mongoose.Schema.Types.ObjectId , 

 ref : "User" ,


 required : true 


} ,



prompt : {

type : String ,

required : true ,

trim : true 

} ,


imageUrl : {

 type : String ,

 required : true

} ,



} , {timestamps : true })




const Image = mongoose.model("Image" , imageSchema)  


export default Image






