const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');


function getLoginPage(req, res, next) {
  res.send('Login Page');
}

function getSignUpPage(req, res, next) {
  res.send('Sign Up Page');
}

async function createUser(req, res, next) {
  const {username, email, password} = req.body;
  
  try {  
    const hash = await bcrypt.hash(password, 10)
    const user = await db.createUser(username, email, hash);
    if(!user) {
      res.status(401).json({
        success: false,
        message: 'Failed to create user'
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Created user'
      });
    }
  } catch (error) {
    console.log(error)
  }
}


// async function something(asyncHandler(params)) {
  
// }


module.exports = {
  getLoginPage,
  getSignUpPage,
  createUser
}