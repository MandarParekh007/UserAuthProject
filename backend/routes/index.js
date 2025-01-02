import express from "express"
import { register } from "../controllers/UserController.js";
import V1Routes from "./v1/User.js"


const router = express.Router();

router.use('/v1',V1Routes)

export default router