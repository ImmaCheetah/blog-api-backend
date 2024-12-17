const db = require("../db/queries");

function getLoginPage(req, res, next) {
  res.send('Login Page');
}

function getSignUpPage(req, res, next) {
  res.send('Sign Up Page');
}

async function createUser(req, res, next) {
  res.send('Created user');
}

module.exports = {
  getLoginPage,
  getSignUpPage,
  createUser
}