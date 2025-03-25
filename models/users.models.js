import { mongoose } from 'mongoose'
import validatior from "validator"
import bcrypt from 'bcryptjs'

let UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Wrong email"]
    },
    age: {
        type: Number,
        min: 12,
        max: 80
    },

    imagePath: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})

UserSchema.pre('save', async function (next) {
	let password = this.password
	this.password = await bcrypt.hash(password, 12)
	console.log(this.password)

	next()
})

GuideSchema.virtual('blogs', {
	ref: 'blogs',
	localField: '_id',
	foreignField: 'user',
})


let user = mongoose.model("users", UserSchema)

export default user