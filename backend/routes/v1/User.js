import express from "express"
import { login, register } from "../../controllers/UserController.js"

const router = express.Router()


router.post('/user',register)
router.post('/user/login',login)

export default router
