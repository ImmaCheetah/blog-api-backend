const db = require("../db/queries");

function getMainPage(req, res, next) {
  res.send('Home Page');
}

module.exports = {
  getMainPage
}