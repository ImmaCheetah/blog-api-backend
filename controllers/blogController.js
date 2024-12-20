const db = require("../db/queries");

async function getAllPosts(req, res, next) {
  const posts = await db.getAllPosts();
  res.json({
    success: true,
    user: req.user,
    posts: posts
  });
}

async function getPost(req, res, next) {
  res.send('Single Post')
}

async function getPostComments(req, res, next) {
  res.send('Post comments')
}

async function createNewPost(req, res, next) {
  const userId = req.user.id;
  const {title, content} = req.body;

  const post = await db.createPost(userId, title, content);
  
  res.json({
    success: true,
    user: req.user,
    post: post
  });
}

module.exports = {
  getAllPosts,
  getPost,
  getPostComments,
  createNewPost
}