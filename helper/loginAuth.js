const passport = require("passport");

function loginAuth(req, res, next) {
  console.log("LOGIN REQUEST", req.body);
  // 
  const middleware = passport.authenticate("local", function (err, user, info) {
      
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
      console.log("USER DATA", user);
      req.login(user, function(err) {
        console.log('LOGIN USER', user)
        if (err) {
         return next(err);
        }
      })
      next();
    }
  });
  middleware(req, res, next)
}

module.exports = {
  loginAuth,
};
