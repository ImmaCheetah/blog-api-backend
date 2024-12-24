function getMainPage(req, res, next) {
  res.json({
    title: "Home Page",
  });
}

module.exports = {
  getMainPage,
};
