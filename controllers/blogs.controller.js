import { errorHandler } from '../utils/error.handler.js'

let GET = errorHandler(async (req, res, next) => {})
let GET_BY_ID = errorHandler(async (req, res, next) => {})
let POST = errorHandler(async (req, res, next) => {})
let UPDATE = errorHandler(async (req, res, next) => {})
let DELETE = errorHandler(async (req, res, next) => {})

export default {
	GET,
	GET_BY_ID,
	POST,
	UPDATE,
	DELETE,
}
