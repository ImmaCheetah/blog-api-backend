require("dotenv").config();
const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { loginAuth } = require("../helper/loginAuth");
const { assignToken } = require("../helper/tokenAssign");
require("../config/passport");

userRouter.get("/login", userController.getLoginPage);
userRouter.get("/sign-up", userController.getSignUpPage);

userRouter.post("/sign-up", userController.validateUser, userController.createUser);
userRouter.post("/login", loginAuth, assignToken);

module.exports = userRouter;
