require("dotenv").config();
const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const { loginAuth } = require("../helper/loginAuth");

userRouter.get("/login", userController.getLoginPage);
userRouter.get("/sign-up", userController.getSignUpPage);

userRouter.post("/sign-up", userController.createUser);
userRouter.post("/login", loginAuth);

module.exports = userRouter;
