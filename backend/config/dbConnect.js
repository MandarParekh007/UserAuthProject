/* eslint-disable no-undef */
import mongoose from "mongoose";



export default function dbConnect() {
    mongoose.connect(process.env.MONGO_URI, {
    }).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log(err.message)
    });
}
