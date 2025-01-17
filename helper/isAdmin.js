require("dotenv").config();

module.exports.isAdmin = (req, res, next) => {
  const origin = req.get('origin');

  if (origin === process.env.STUDIO_SITE_ORIGIN && !req.user.isAuthor) {
    res.status(403).json({
      errorMsg: 'Unauthorized'
    })
  } else {
    next();
  }
}