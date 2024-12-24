const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helper/CustomError");

function getLoginPage(req, res, next) {
  res.send("Login Page");
}

function getSignUpPage(req, res, next) {
  res.send("Sign Up Page");
}

const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

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

module.exports = {
  getLoginPage,
  getSignUpPage,
  createUser,
};
