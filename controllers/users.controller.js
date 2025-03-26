import { errorHandler } from "../utils/error.handler.js";
import { responce } from "../utils/response.js";
import User from "../models/users.models.js"
let GET = errorHandler(async (req, res, next) => {
    let user = await User.findById(req.id).exec()
    if(!user) throw new Error("User not found")
    
    responce(res, 200, {user})
})

export default {
    GET,
}