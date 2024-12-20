const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler')


function getLoginPage(req, res, next) {
  res.send('Login Page');
}

function getSignUpPage(req, res, next) {
  res.send('Sign Up Page');
}

async function createUser(req, res, next) {
  const {username, email, password} = req.body;
  
  try {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      // if err, do something
      if (err) {
        console.log("error happened hashing");
      } else {
        // otherwise, store hashedPassword in DB
        const user = await db.addUser(username, email, hashedPassword);
        console.log(user);
        console.log("password hashed");
      }
    });
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

module.exports = {
  getLoginPage,
  getSignUpPage,
  createUser
}