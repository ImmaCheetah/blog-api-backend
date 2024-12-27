const passport = require("passport");
const jwt = require("jsonwebtoken");
const { assignToken } = require("./tokenAssign");

function loginAuth(req, res, next) {
  console.log('LOGIN REQUEST', req.body)
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log("PASSPORT AUTHENTICATE ERROR");
      return next(err);
    }

    if (!user) {
      console.log("NO USER");
      res.json({
        message: "Failed login",
      });
    }

    if (user) {
      console.log("THERE IS A USER");
      console.log('USER DATA', user);
      assignToken(req, res, next);
      // jwt.sign({ user: req.user }, process.env.SECRET, (err, token) => {
      //   console.log(token);
      //   // localStorage.setItem("myCat", "Tom");
      //   return res.status(200).json({
      //     message: "Success",
      //     token,
      //   });
      // });
    }
  })(req, res, next);
}

module.exports = {
  loginAuth,
};
