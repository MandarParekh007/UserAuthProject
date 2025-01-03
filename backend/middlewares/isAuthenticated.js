import { verifyJwt } from "../services/User.js";



export async function isAuthenticated(req,res,next){
    const authToken = req.headers['authorization'];
    

    if(!authToken) return res.status(401).json({
        success:false,
        message:"Not Authorized"
    })

    const id = await verifyJwt(authToken);

    req.userId = id;

    next();
}