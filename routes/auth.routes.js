import authController from "../controllers/auth.controller.js"
import { Router } from "express";
import multer from 'multer'
import path from "path"


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
        const ext = path.extname(file.originalname);
        if(!file) return cb(new Error("File not exist"))
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') return cb(new Error('Invalid image extension.'));
    },
 }, 
    
)

route.post("/register", upload.single("file"), authController.REGISTER)
route.post("/login", authController.LOGIN)
route.post("/refresh", authController.REFRESH)
route.post("/logout", authController.LOGOUT)

export default route