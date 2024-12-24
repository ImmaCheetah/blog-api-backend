const passport = require("passport");
const { assignToken } = require("./tokenAssign");

function loginAuth(req, res, next) {
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
      assignToken(req, res, next);
    }
  })(req, res, next);
}

module.exports = {
  loginAuth,
};
