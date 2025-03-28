import Posts from '../models/blogs.models.js'
import { errorHandler } from '../utils/error.handler.js'
import { responce } from '../utils/response.js'

let GET = errorHandler(async (req, res, next) => {
	let posts = await Posts.find().populate('author')
	responce(res, 200, { posts })
})
let GET_BY_ID = errorHandler(async (req, res, next) => {
	let post = await Posts.findById(req.params.id).populate('author').exec()
	if (!post) throw new Error('Post not found')

	responce(res, 200, { post })
})
let POST = errorHandler(async (req, res, next) => {
	console.log('hi')

	let body = req.body.body ? JSON.parse(req.body.body) : req.body

	if (!body.title || !body.post_body)
		throw new Error('Datas not entered fully!')

	if (req.file) body.imagePath = '/uploads/blogs/' + req.file.filename
	body.author = req.id

	let data = await Posts.create(body)

	responce(res, 201, { message: 'Post Created Successfully', data })
})
let UPDATE = errorHandler(async (req, res, next) => {
    if(req.id == null) throw new Error("You are unable to update this post")
	let body = req.body
	let post = await Posts.findById(req.params.id)
	if (!body.title) post.title = post.title
	if (!body.post_body) post.post_body = post.post_body
	else {
		post.title = body.title
		post.post_body = body.post_body
	}

	await post.save()
	responce(res, 203, { message: 'Successfully updated', post })
})
let DELETE = errorHandler(async (req, res, next) => {
    if(req.id == null) throw new Error("You are unable to delete this post")

    await Posts.findByIdAndDelete(req.params.id)
    responce(res, 200, {message: "Seccessfully deleted"})

})

export default {
	GET,
	GET_BY_ID,
	POST,
	UPDATE,
	DELETE,
}
