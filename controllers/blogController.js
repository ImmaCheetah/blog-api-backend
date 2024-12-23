const db = require("../db/queries");
const asyncHandler = require('express-async-handler')
const CustomError = require("../helper/CustomError");

const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await db.getAllPosts();

  if (!posts) {
    next(new CustomError('Not Found', 'Failed to get all posts', 404)) 
  } else {
    res.json({
      success: true,
      user: req.user,
      posts: posts
    });
  }
})

const getPost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const post = await db.getPost(postId);

  if (!post) {
    next(new CustomError('Not Found', 'Failed to get post', 404)) 
  } else {
    res.json({
      success: true,
      post: post
    });
  }
})

async function getPostComments(req, res, next) {
  res.send('Post comments')
}

const createNewPost = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const {title, content} = req.body;

  const post = await db.createPost(userId, title, content);

  if (!post) {
    next(new CustomError('Not Found', 'Failed to create post', 404))
  } else {
    res.json({
      success: true,
      user: req.user,
      post: post
    });
  }
})

const editPost = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const {title, content, isPublished} = req.body;

  // ADD ISPUBLUSHED VALUE WHEN MAKING FRONT END**********
  const updatedPost = await db.updatePost(userId, postId, title, content);

  if (!post) {
    next(new CustomError('Not Found', 'Failed to update post', 404))
  } else {
    res.json({
      success: true,
      user: req.user,
      updatedPost: updatedPost
    });
  }
})


const deletePost = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const post = await db.getPost(postId);
  
  if (!post) {
    return next(new CustomError('Not Found', 'Failed to delete post', 404))
  }
  await db.deletePost(userId, postId);

  res.json({
    success: true,
    user: req.user,
    message: "Post deleted"
  })

})

const createComment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const {content} = req.body;

  const comment = await db.createComment(userId, postId, content);

  if (!comment) {
    next(new CustomError('Not Found', 'Failed to create comment', 404))
  } else {
    res.json({
      success: true,
      user: req.user,
      message: "Created comment",
      comment: comment
    })
  }
})

module.exports = {
  getAllPosts,
  getPost,
  getPostComments,
  createNewPost,
  editPost,
  deletePost,
  createComment,
}