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

            const token = await loginUser.createHash(loginUser)

            return res.status(200).json({
                success:true,
                message:"Logged In Successfully",
                token,
                loginUser
            })
        }

        return res.status(404).json({
            success:false,
            message:"User Not Found"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error While Logging in the user",
            error:err.message
        })
    }
}

export async function getUserDetails(req,res){
    try{
        const {id} = req.params;

        const user = await UserService.getUserById(id)

        if(user)
        {
            return res.status(200).json({
                success:true,
                message:"User Found Successfully",
                user
            })
        }
        
        return res.status(404).json({
            success:false,
            message:"No User Found"
        })

    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        })
    }

}
