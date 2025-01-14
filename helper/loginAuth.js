const passport = require("passport");
require("../config/passport");

function loginAuth(req, res, next) {
  console.log("LOGIN REQUEST", req.body);
  passport.authenticate("local", { session: false, failWithError: true })(req, res, next);
}

module.exports = {
  loginAuth,
};
