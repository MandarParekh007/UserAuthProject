import express from "express"
import { login, register, getUserDetails } from "../../controllers/UserController.js"
import { validateLogin, validateRegister } from "../../middlewares/validateLogin.js"
import { isAuthenticated } from "../../middlewares/isAuthenticated.js"

const router = express.Router()


router.post('/user',validateRegister,register)
router.post('/user/login',validateLogin,login)

router.use(isAuthenticated)
router.get('/user/:id',getUserDetails)

export default router
