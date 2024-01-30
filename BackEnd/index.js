const express = require("express");
const app = express();
const UsersRouter = require("./src/router/usersRouter")
const port = process.env.PORT || 3001;
const dbConnect = require("./src/config/db");
const cors = require("cors");
dbConnect();
app.use(cors());
app.use(express.json());
app.use("/",UsersRouter)

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
  console.log(`http://localhost:${port}/`);
});
