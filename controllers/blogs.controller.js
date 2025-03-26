import { populate } from 'dotenv'
import Posts from '../models/blogs.models.js'
import { errorHandler } from '../utils/error.handler.js'
import { responce } from '../utils/response.js'

let GET = errorHandler(async (req, res, next) => {
	let posts = await Posts.find().populate("author")
	responce(res, 200, { posts })
})
let GET_BY_ID = errorHandler(async (req, res, next) => {
	let post = await Posts.findById(req.params.id).populate("author").exec()
	if (!post) throw new Error('Post not found')

	responce(res, 200, { post })
})
let POST = errorHandler(async (req, res, next) => {
	let body =  req.body.body ? JSON.parse(req.body.body) : req.body
	if (!body.title || !body.post_body) throw new Error('Datas not entered fully!')

	if (req.file) body.imagePath = '/uploads/blogs/' + req.file.filename
	body.author = req.id

    let data = await Posts.create(body)

    responce(res, 201, {message: "Post Created Successfully", data})
})
let UPDATE = errorHandler(async (req, res, next) => {})
let DELETE = errorHandler(async (req, res, next) => {})

export default {
	GET,
	GET_BY_ID,
	POST,
	UPDATE,
	DELETE,
}
