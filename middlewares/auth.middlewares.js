import { authErrorHandler } from '../utils/error.handler.js'
import jwt from "jsonwebtoken"

let checkUser = authErrorHandler(async (req, res, next) => {
    
	let token = req.headers.authorization
	if (!token) throw new Error('Log In or Register Please!')
	if (!token.startsWith('Bearer'))
		throw new Error('Please enter valid token!')
	token = token.split(' ')[1]
    let verified = jwt.verify(token, process.env.SECRET_KEY)
    req.id = verified.id

	next()
})

export default {
	checkUser,
}
