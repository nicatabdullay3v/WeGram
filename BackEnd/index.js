import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import usersRoute from "./routes/users.routes.js";
import connectToMongoDb from "./db/connectToMongoDB.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // include credentials (cookies, HTTP authentication) in the CORS request
}));
app.use(cookieParser());

const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/users", usersRoute);
app.use(express.static("./public"));
// app.get("/",(req,res)=>{
//     res.send("salam")
// })
app.listen(port, () => {
  connectToMongoDb();
  console.log(`Server Running on port ${port} `);
});
