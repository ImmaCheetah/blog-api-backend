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
  const postId = req.params.postId;

  const post = await db.getPost(postId);
  res.json({
    success: true,
    post: post
  });
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

async function editPost(req, res, next) {
  const userId = req.user.id;
  const postId = req.params.postId;
  const {title, content, isPublished} = req.body;

  // ADD ISPUBLUSHED VALUE WHEN MAKING FRONT END
  const updatedPost = await db.updatePost(userId, postId, title, content);

  res.json({
    success: true,
    user: req.user,
    updatedPost: updatedPost
  });
}

async function deletePost(params) {
  
}

module.exports = {
  getAllPosts,
  getPost,
  getPostComments,
  createNewPost,
  editPost,
  deletePost
}