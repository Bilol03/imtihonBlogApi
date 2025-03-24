import { responce } from "./responce.handler.js"

let errorHandler = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch((err) => {
			console.log(err, 'errorcha')
			responce(res, 404, 'Xatolik: ' + err.message)
		})
	}
}

export { errorHandler }
