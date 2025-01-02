import User from "../models/User.js";


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
    const {email,password} = userData

    const user = await User.findOne({email})

    if(!user){
        throw new Error("User Does Not Exist")
    }

    const isMatch = await user.matchPassword(password)

    if(isMatch){
        return user
    }

}