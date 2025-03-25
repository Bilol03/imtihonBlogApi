import { errController } from './controllers/errorhandler.controller.js'
import { connectDB } from './configs/db.config.js'
import { config } from 'dotenv'
import express from 'express'
config()

let app = express()
app.use(express.json())
app.use("/uploads", express.static( "./uploads"))

import authRole from "./routes/auth.routes.js"

app.use(authRole)

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