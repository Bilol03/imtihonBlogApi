import userController from "../controllers/users.controller.js"
import authUser from "../middlewares/auth.middlewares.js"
import { Router } from "express";

let route = Router()

route.get("/me", authUser.checkUser, userController.GET)

export default route