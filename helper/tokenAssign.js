const jwt = require("jsonwebtoken");

function assignToken(req, res, next) {
  if (req.user) {
    console.log('THERE IS A USER')
    jwt.sign({user: req.user}, process.env.SECRET, (err, token) => {
      console.log(token)
      // localStorage.setItem("myCat", "Tom");
      return res.status(200).json({
        message: 'Success',
        token
      })
    });
  }
}

module.exports = {
  assignToken
}