import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/dbConnect.js";
import UserRoutes from "./routes/index.js";

const app = express();

//configured the env file
dotenv.config({
    path:'config/.env'
})
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//connect to database
dbConnect();


//routes
app.use('/api',UserRoutes)






export default app