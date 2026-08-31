



// import Image from "../models/ImageSchema.js"

// import asyncHandler from "express-async-handler";

// import cloudinary from "../config/cloudinary.js";  

// import { GoogleGenAI } from "@google/genai";



// const genAI = new GoogleGenAI({ apiKey : process.env.Google_generative_API })


// const generateImages = asyncHandler ( async (req , res) => {


// const {prompt} = req.body

// const user = req.user 



// if(!prompt) {

// return res.status(400).json({ message : "Prompt is required" })

// }




// let translatedPrompt = prompt 


// try {

// const result = await genAI.models.generateContent({

// model : "gemini-3.5-flash" , 

// contents : `Translate the following text to English Return ONLY the translated text with no extra explanation or quotes: ${prompt}`

// })

// translatedPrompt = result.candidates[0].content.parts[0].text.trim() 


// // translationResult = { دة شكل نتيجة بترجع من موديل جيمناي بعد ما ترجم نص الفكرة ان ذكاء اصطناعي بتاع كليب دروب مش بيفهم لغة عربية ولا اي لغة ماعدا الانجليزي عشان كدة استخدمت جينماي في ترجمة بروميت عشان كدة استخدمت جيمناي في ترجمة في بروميت قبل مانبعتوة لدروب داون وهنخزن في داتا بيز بروميت الأصلي بنفس لغة اللى كتبها مستخدم عشان لو حبينا نعرضلوة محتوي صورة اللى هو عايزها
// //   candidates: [                          // مصفوفة فيها الإجابات
// //     {
// //       content: {
// //         parts: [                          // مصفوفة فيها أجزاء الرد
// //           { text: "A red car in the desert" }   // ← النص المترجم هنا
// //         ]
// //       }
// //     }
// //   ]
// // }

// }


// catch(err){

// console.log("Translation failed, using original prompt");

// }

// const form = new FormData () 


// form.append("prompt" , translatedPrompt) 




// const response = await fetch("https://clipdrop-api.co/text-to-image/v1" , {

// method : "POST" ,

// headers : {

//  'x-api-key': process.env.CLIPDROP_API , 

// }, 

// body : form 


// })



// if(!response.ok) {

// return res.status(500).json({ message : "Failed to generate image" })

// }



// const arrayBuffer = await response.arrayBuffer() // نحول ملف بتاعنا لبافر بيانات خام ثم بيانات ثنائية عشان سيرفر يفهموة


// const base64Image = Buffer.from(arrayBuffer).toString("base64")


// const ImageUrl = `data:image/png;base64,${base64Image}`



// const uploadResult = await cloudinary.uploader.upload(ImageUrl , {

// folder : "ai-generated-images"

// })



// const saveImage = await Image.create({

// user : user , 

// prompt , 

// imageUrl : uploadResult.secure_url


// })



// res.status(201).json({ image: saveImage });

  
// })



// export default generateImages


////////////////////////////////////////////////////////////////////////////////////////////////////



import Image from "../models/ImageSchema.js" 

import asyncHandler from "express-async-handler"

import { GoogleGenAI } from "@google/genai"

import cloudinary from "../config/cloudinary.js"



const genAI = new GoogleGenAI({ apiKey : process.env.Google_generative_API })




const generateImages = asyncHandler( async (req , res) => {


const {prompt} = req.body 

const user = req.user 



if(!prompt) {

return res.status(400).json({ message : "Prompt is required" })

}



let translatedPrompt = prompt 


try {

const result = await genAI.models.generateContent({

model : "gemini-3.5-flash" , 

contents : `Translate the following text to English Return ONLY the translated text with no extra explanation or quotes: ${prompt}`


})


translatedPrompt = result.candidates[0].content.parts[0].text.trim()

}

catch(err) {

console.log("Translation failed, using original prompt")

}



const form = new FormData() 


form.append("prompt" , translatedPrompt )



const response = await fetch("https://clipdrop-api.co/text-to-image/v1" , {


method : "POST" , 

headers : {

'x-api-key': process.env.CLIPDROP_API ,

} ,

body : form 


})


if(!response.ok) {

return res.status(500).json({ message : "Failed to generate image" })

}


const arrayBuffer = await response.arrayBuffer() 


const Base64Image = Buffer.from(arrayBuffer).toString("base64") 


const ImageUrl = `data:image/png;base64,${Base64Image}`

// دة لينك مسار طبعا بيكون لينك طويل جدا جدا جدا مش هينفع نخزنة في داتا بيز عشان كدة بنودية على كلويندري على طول وكلويندري يرجعلنا لينك مظبوط ميكونش طويل جدا جدا جدا زاي فورم داتا كدة



const uploadImage = await cloudinary.uploader.upload(ImageUrl , {

folder : "ai-generated-images"


})


const saveImage = await Image.create({

user : user ,

prompt ,

imageUrl : uploadImage.secure_url

})



res.status(201).json({ image : saveImage })




})



export default generateImages




