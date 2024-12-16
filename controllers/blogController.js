const db = require("../db/queries");

function getAllPosts(req, res, next) {
  res.send('Posts');
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