require("dotenv").config();
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helper/CustomError");
const { body, validationResult } = require("express-validator");

const alphaErr = "must contain only letters and numbers";
const lengthErr = "must contain between 1 and 30 characters";
const emailErr = "must be in correct format";

const validateUser = [
  body("username")
    .trim()
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Username ${lengthErr}`)
    .custom(async (value) => {
      const user = await db.findUserByUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("email")
    .trim()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Email ${lengthErr}`)
    .custom(async (value) => {
      const user = await db.findUserByEmail(value);
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .trim()
    .isStrongPassword()
    .withMessage(
      "Password requires: - 6 characters - 1 capital letter - 1 number - 1 special character",
    )
    .isLength({ min: 1, max: 30 }),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords don't match`),
];

function getLoginPage(req, res, next) {
  res.send("Login Page");
}

function getSignUpPage(req, res, next) {
  res.send("Sign Up Page");
}

const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await db.createUser(username, email, hash);

  if (!user) {
    next(new CustomError("Create error", "Failed to create user", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "Created user",
    });
  }
});

const setAuthor = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  console.log(req.user);
  console.log(password);

  if (password === process.env.AUTHOR_PASSWORD) {
    const author = await db.setAuthor(req.user.id);
    console.log(author);
    res.json({
      message: "Updated user",
    });
  } else {
    res.status(400).json({
      message: "Wrong password",
    });
  }
});

module.exports = {
  getLoginPage,
  getSignUpPage,
  createUser,
  setAuthor,
  validateUser,
};
