const UserRouter = require("express").Router()
const usersController = require("./../controllers/usersControllers")

UserRouter.get("/users",usersController.getAllUsers)
UserRouter.post("/users",usersController.postUsers)
UserRouter.patch("/users/:id",usersController.patchUsers)
UserRouter.post("/login",usersController.login)

module.exports= UserRouter