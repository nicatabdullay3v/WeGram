import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"
import usersRoute from "./routes/users.routes.js"
import connectToMongoDb from "./db/connectToMongoDB.js"
import cors from "cors"
dotenv.config()

const app = express()
app.use(cors())

const port = process.env.PORT || 3000
app.use(express.json()) 
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)
app.use("/api/users",usersRoute)

// app.get("/",(req,res)=>{
//     res.send("salam")
// })
app.listen(port,()=>{
    connectToMongoDb()
    console.log(`Server Running on port ${port} `);
})