

module.exports.isAdmin = (req, res, next) => {
  const origin = req.get('origin');

  if (origin === 'http://localhost:5173' && !req.user.isAuthor) {
    res.status(403).json({
      errorMsg: 'Unauthorized'
    })
  } else {
    next();
  }
}