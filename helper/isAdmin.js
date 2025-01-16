

module.exports.isAdmin = (req, res, next) => {
  const origin = req.get('origin');
  console.log(origin)

  console.log(req.user)

  if (origin === 'http://localhost:5173' && !req.user.isAuthor) {
    res.status(403).json({
      errorMsg: 'Unauthorized'
    })
  } else {
    next();
  }
}