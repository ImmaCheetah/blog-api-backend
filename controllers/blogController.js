const db = require("../db/queries");

function getAllPosts(req, res, next) {
  res.json({
    success: true,
    user: req.user
  });
}

async function getPost(req, res, next) {
  res.send('Single Post')
}

async function getPostComments(req, res, next) {
  res.send('Post comments')
}

async function createNewPost(req, res, next) {
  res.send('Created new post')
}

module.exports = {
  getAllPosts,
  getPost,
  getPostComments,
  createNewPost
}