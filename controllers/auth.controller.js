import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/users.models.js'
import { errorHandler } from '../utils/error.handler.js'
import { responce } from '../utils/response.js'

let REGISTER = errorHandler(async (req, res, next) => {
	let body = JSON.parse(req.body.body)
	if (
		!body.firstName ||
		!body.username ||
		!body.age ||
		!body.email ||
		!body.password
	)
		throw new Error('Datas not entered fully')

	let [existUser, existUserEmail] = await Promise.all([
		User.find({ username: body.username }),
		User.find({ email: body.email }),
	])
	if (existUser.length || existUserEmail.length) {
		throw new Error(`${existUser.length ? 'username' : 'email'} exists`)
	}
	if (req.file) body.imagePath = '/uploads/users/' + req.file.filename

	let user = await User.create(body)
	responce(res, 201, { message: 'Successfully registered!', user })
})

let LOGIN = errorHandler(async (req, res, next) => {
	let { username, password } = req.body
	if (!username || !password)
		throw new Error('Username or Passwor not entered')
	let user = await User.findOne({ username })
		.select('password username email firstName role')
		.exec()
	if (!user) throw new Error('User not registered ')

	console.log(req.body)

	let checking = await bcrypt.compare(password, user.password)
	if (!checking) throw new Error('Wrong password!')
	user.password = password

	let token = jwt.sign(
		{ id: user.id, role: user.role },
		process.env.SECRET_KEY,
		{ expiresIn: process.env.JWT_EXP_TIME },
	)

	let refreshToken = jwt.sign(
		{ id: user.id, role: user.role },
		process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
		{ expiresIn: eval(process.env.JWT_REFRESH_EXP_TIME) },
	)
	user.refreshToken = refreshToken
	await user.save()

	let options = {
		maxAge: eval(process.env.JWT_REFRESH_EXP_TIME),
		httpOnly: false,
	}

	res.cookie('jwt', refreshToken, options)

	let userObj = user.toObject()

	delete userObj.password
	delete userObj.refreshToken

	responce(res, 200, { userObj, token })
})

let REFRESH = errorHandler(async (req, res, next) => {
	let token = req.cookies.jwt
	let checkUser = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET_KEY)

	let user = await User.findOne({ refreshToken: token })
	if (!user || user.id !== checkUser.id) {
		throw new Error('User not found')
	}

	let accessToken = jwt.sign(
		{ id: user.id, role: user.role },
		process.env.SECRET_KEY,
		{ expiresIn: process.env.JWT_EXP_TIME },
	)

	responce(res, 200, { token: accessToken })
})

let LOGOUT = errorHandler(async (req, res, next) => {
    res.clearCookie("jwt")
    res.status(200).json({message: "Logged Out"})
})

export default {
	REGISTER,
	LOGIN,
	REFRESH,
    LOGOUT
}
