import { authErrorHandler } from '../utils/error.handler.js'
import Posts from "../models/blogs.models.js"


let checkOwner = authErrorHandler(async (req, res, next) => {
    let post = await Posts.findById(req.params.id).exec()
    if(!post) throw new Error("Post not found")
    
    if (post.author != req.id) req.id = null
	next()
})

export default {
	checkOwner
}