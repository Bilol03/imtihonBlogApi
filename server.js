import { errController } from './controllers/errorhandler.controller.js'
import { connectDB } from './configs/db.config.js'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import express from 'express'
config()

let app = express()
app.use(express.json())
app.use(cookieParser());
app.use("/uploads", express.static( "./uploads"))


import authRole from "./routes/auth.routes.js"
import userRoute from "./routes/users.routes.js"

app.use("/auth", authRole)
app.use("/users", userRoute)

connectDB()
app.use(errController);


process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION 💥");
    console.log(err.name, err.message);
    // process.exit(1);
  });
  
  // Unhandled Excpections
  process.on("uncaughtException", (err) => {
    console.log("UNHANDLED Excpections 💥");
    console.log(err.name, err.message);
    // process.exit(1);
});

app.listen(process.env.PORT, () => console.log("This server is running on " + process.env.PORT))