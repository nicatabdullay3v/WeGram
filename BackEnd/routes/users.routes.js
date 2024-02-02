import express from "express"
import protectRoute from "../middleware/protetcRoute"
import { getUsers } from "../controllers/users.controller.js"

const router = express.Router()

router.get("/",protectRoute,getUsers)


export default router