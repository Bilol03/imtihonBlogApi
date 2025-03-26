import { responce } from "./response.js"

let errorHandler = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch((err) => {
			console.log(err, 'errorcha')
			responce(res, 404, 'Error: ' + err.message)
		})
	}
}

export { errorHandler }
