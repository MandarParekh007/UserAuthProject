import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique:false
    },
    password: {
        type: String,
        required: true,
    },
});



userSchema.pre('validate', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

userSchema.methods.createHash = async (userData,res) => {
    try{
        const {id} = userData
        const token = await jwt.sign(id, process.env.JWT_SECRET)

        return token
    }catch(err){

    }
}


userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", userSchema);
export default User;
