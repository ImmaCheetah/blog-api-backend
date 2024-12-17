const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get('/login', userController.getLoginPage);
userRouter.get('/sign-up', userController.getSignUpPage);

// userRouter.post('/login', userController.createNewPost);
userRouter.post('/sign-up', userController.createUser);

module.exports = userRouter;