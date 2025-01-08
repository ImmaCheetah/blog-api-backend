require("dotenv").config();
const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const { loginAuth } = require("../helper/loginAuth");
const { assignToken } = require("../helper/tokenAssign");
const passport = require("passport");
require("../config/passport");

userRouter.get("/login", userController.getLoginPage);
userRouter.get("/sign-up", userController.getSignUpPage);

userRouter.post("/sign-up", userController.validateUser, userController.createUser);
userRouter.post("/login", loginAuth, assignToken);
userRouter.post(
  "/author/sign-up",
  passport.authenticate('jwt', { session: false }),
  userController.setAuthor
)
module.exports = userRouter;
