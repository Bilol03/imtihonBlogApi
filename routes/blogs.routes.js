import postController from '../controllers/blogs.controller.js'
import authorization from '../middlewares/auth.middlewares.js'
import owner from '../middlewares/owner.middlwares.js'
import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

let route = Router()
const uploadDir = path.join(process.cwd(), 'uploads', 'blogs')

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

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
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg' && ext !== ".JPG")
            return cb(new Error('Invalid image extension.'))
        cb(null, true);
    },
    limits: 1,

})


route
	.get('/posts', postController.GET)
	.get('/posts/:id', postController.GET_BY_ID)
	.post('/posts',authorization.checkUser, upload.single('img'), postController.POST)
	.put('/posts/:id', authorization.checkUser, owner.checkOwner,  postController.UPDATE)
	.delete('/posts/:id', authorization.checkUser, owner.checkOwner, postController.DELETE)

export default route
