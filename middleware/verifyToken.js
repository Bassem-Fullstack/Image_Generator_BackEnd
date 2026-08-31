

import asyncHandler from "express-async-handler";


import jwt from "jsonwebtoken";





const verifyToken = asyncHandler ( async ( req  , res , next) =>  {


const getToken = req.headers.authorization.replace("Bearer " , "") 


if(!getToken) {

return res.status(401).json({ message : "No authorizad provided" })

}



const decode = jwt.verify ( getToken , process.env.Secret_Key_Token)


req.user = decode.userID 


next()


})





export default verifyToken






