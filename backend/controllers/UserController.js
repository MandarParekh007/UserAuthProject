import * as UserService from "../services/User.js"

export async function register(req, res) {
    try {
        const {username,email,password} = req.body

        const user = await UserService.createUser(username,email,password);

        return res.status(201).json({
            success: true,
            user,
        });
    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the user.",
            error:err.message
        });
    }
}

export async function login(req,res) {
    try{
        const userData = req.body

        const loginUser = await UserService.loginUser(userData)

        if(loginUser){
            return res.status(200).json({
                success:true,
                loginUser
            })
        }

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error While Logging in the user",
            error:err.message
        })
    }
}
