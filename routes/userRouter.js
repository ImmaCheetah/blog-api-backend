require("dotenv").config();
const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

userRouter.get('/login', userController.getLoginPage);
userRouter.get('/sign-up', userController.getSignUpPage);

userRouter.post('/sign-up', userController.createUser);
// userRouter.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   if (email === 'dave@email.com') {
//     if (password === 'pass123') {
//       const secret = process.env.SECRET;
//       const token = jwt.sign({email}, secret)

//       return res.status(200).json({
//         message: "Auth Passed",
//         token
//       })
//     }
//   }
//   return res.status(401).json({ message: "Auth Failed" })
// });

userRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureMessage: true,
    successRedirect: "/",
  }),
);

module.exports = userRouter;