const jwt = require("jsonwebtoken");

function assignToken(req, res, next) {
  if (req.user) {
    jwt.sign({ user: req.user }, process.env.SECRET, (err, token) => {
      console.log(token);
      return res.status(200).json({
        message: "Success",
        token,
      });
    });
  }
}

module.exports = {
  assignToken,
};
