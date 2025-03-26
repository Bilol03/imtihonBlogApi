import mongoose from "mongoose";

let connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("Connected to DB*")
                
    } catch (error) {
       throw { status: 500, name: "Database error! \n", message: error.message }
    }
}
export { connectDB }