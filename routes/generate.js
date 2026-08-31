

import express from "express" 


import verifyToken from "../middleware/verifyToken.js" 


import checkLimit from "../middleware/limitedChance.js"


import generateImages from "../controllers/genertiveAI.js"





const router = express.Router() 





router.post("/generate" , verifyToken , checkLimit , generateImages )



export default router 
