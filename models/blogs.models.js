import { mongoose } from 'mongoose'

let BlogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	imagePath: {
		type: String,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
})

let blog = mongoose.model("blogs", BlogSchema)

export default blog
