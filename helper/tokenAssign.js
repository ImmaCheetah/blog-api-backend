const jwt = require("jsonwebtoken");
require("../config/passport");
function assignToken(req, res, next) {
  console.log("ASSIGN TOKEN USER", req.user);
  if (req.user) {
    jwt.sign({ user: req.user }, process.env.SECRET, (err, token) => {
      console.log(token);
      return res.status(200).json({
        message: "Success",
        token: `Bearer ${token}`,
        user: {
          id: req.user.id,
          username: req.user.username
        }

      });
    });
  }
}

module.exports = {
  assignToken,
};
