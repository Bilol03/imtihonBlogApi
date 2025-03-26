import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import postController from '../controllers/blogs.controller.js'
import authorization from '../middlewares/auth.middlewares.js'

let route = Router()
const uploadDir = path.join(process.cwd(), 'uploads', 'users')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir)
	},

	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname),
		)
	},
})

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		const ext = path.extname(file.originalname)
		if (!file) return cb(new Error('File not exist'))
		if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg')
			return cb(new Error('Invalid image extension.'))
	},
})

route
	.get('/posts', postController.GET)
	.get('/posts/:id', postController.GET_BY_ID)
	.post('/posts', upload.single('file'), postController.POST)
	.put('/posts/:id', authorization.checkUser, postController.UPDATE)
	.delete('/posts/:id', authorization.checkUser, postController.DELETE)

export default route
