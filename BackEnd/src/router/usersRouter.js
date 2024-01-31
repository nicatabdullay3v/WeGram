const UserRouter = require("express").Router()
const usersController = require("./../controllers/usersControllers")

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./src/public/images");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
    storage: storage,
  });
UserRouter.get("/users",usersController.getAllUsers)
UserRouter.get("/users/:id/posts/:postId", usersController.getPostById);
UserRouter.patch("/users/:id/posts/:postId", usersController.patchPost);
UserRouter.post("/users" ,usersController.postUsers)
UserRouter.patch("/users/:id",usersController.patchUsers)
UserRouter.post("/login",usersController.login)
UserRouter.patch('/users/:id/addPostImage', upload.single('file'), usersController.addPostImage);
module.exports= UserRouter