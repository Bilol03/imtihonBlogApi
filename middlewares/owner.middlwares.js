import { authErrorHandler } from '../utils/error.handler.js'
import Posts from "../models/blogs.models.js"


let checkOwner = authErrorHandler(async (req, res, next) => {
    let post = await Posts.findById(req.params.id).exec()
    console.log(post);
    
	next()
})

export default {
	checkOwner
}