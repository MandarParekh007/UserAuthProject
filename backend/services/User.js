import mongoose from "mongoose";
import User from "../models/User.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken"

export async function createUser(username,email,password) {
        const user = await User.findOne({username})

        if(!user){
         const createdUser = await User.insertMany({
                username,
                email,
                password
            })

            return createdUser;
        }else{
            throw new Error("User Already There")
        }

}

export async function loginUser(userData){
    const {username,password} = userData
    const user = await User.findOne({username})
    
    if(!user){
        throw new Error("User Does Not Exist")
    }
    
    const isMatch = await user.matchPassword(password)

    if(isMatch){
        return user
    }

}


export async function getUserById(id) {
        // Convert the id to an ObjectId
        const objectId = new ObjectId(id);
        
        // Query the database using the ObjectId
        const user = await User.findOne({ _id: objectId });
        
        return user;

}


export async function verifyJwt(token)
{
    const id = await jwt.verify(token,process.env.JWT_SECRET);

    return id
}