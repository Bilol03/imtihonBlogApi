import { errorHandler } from '../utils/error.handler.js'
errorHandler.default

let errController = (error, req, res, next) => {
	res.status(404).json({ status: 'Failed', message: error.message })
}

export { errController }
