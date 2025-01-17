const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helper/CustomError");
const passport = require("passport");


const getAllPosts = asyncHandler(async (req, res, next) => {
  const origin = req.get('origin');

  // Check if request is coming from studio to show every post
  if (origin === 'http://localhost:5173') {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
      if (!user) {
        return res.status(401).json(
          { 
            errorMsg: 'Not Authorized',
            status: 401
          });
      }
      const posts = await db.getAllPosts();
      if (!posts) {
        next(new CustomError("Not Found", "Failed to get all posts", 404));
        res.status(404).json({
          errorMsg: "Could not get all posts",
        });
      } else {
        res.json({
          success: true,
          user: req.user,
          posts: posts,
        });
      }
    })(req, res, next);
    
  } else {
    const posts = await db.getAllPublishedPosts();
    if (!posts) {
      next(new CustomError("Not Found", "Failed to get all posts", 404));
      res.status(404).json({
        errorMsg: "Could not get all posts",
      });
    } else {
      res.json({
        success: true,
        user: req.user,
        posts: posts,
      });
    }
  }
});

const getPost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const post = await db.getPost(postId);

  if (!post) {
    next(new CustomError("Not Found", "Failed to get post", 404));
    res.status(404).json({
      errorMsg: "Could not find post",
    });
  } else {
    res.json({
      success: true,
      post: post,
    });
  }
});

async function getPostComments(req, res, next) {
  res.send("Post comments");
}

const createNewPost = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { title, content } = req.body;

  const post = await db.createPost(userId, title, content);

  if (!post) {
    next(new CustomError("Not Found", "Failed to create post", 404));
    res.json({
      errorMsg: 'Failed to create post'
    });
  } else {
    res.json({
      success: true,
      user: req.user.username,
      post: post,
    });
  }
});

const editPost = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const { title, content } = req.body;

   const updatedPost = await db.updatePost(userId, postId, title, content);

  if (!updatedPost) {
    next(new CustomError("Not Found", "Failed to update post", 404));
  } else {
    res.json({
      success: true,
      user: req.user,
      updatedPost: updatedPost,
    });
  }
});

const patchPost = asyncHandler(async (req, res, next) => {
  const {postId} = req.params;
  const {isPublished} = req.body;

  if (isPublished === "publish") {
    const post = await db.publishPost(postId);
    if (!post) {
      next(new CustomError("Not Found", "Failed to publish post", 404));
      res.status(404).json({
        errorMsg: "Failed to publish post",
      });
    } else {
      res.json({
        success: true,
        post: post,
        isPublished: post.isPublished
      });
    }
  } else {
    const post = await db.unpublishPost(postId);
    if (!post) {
      next(new CustomError("Not Found", "Failed to unpublish post", 404));
      res.status(404).json({
        errorMsg: "Failed to unpublish post",
      });
    } else {
      res.json({
        success: true,
        post: post,
        isPublished: post.isPublished
      });
    }
  }
});

const deletePost = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const post = await db.getPost(postId);

  if (!post) {
    return next(new CustomError("Not Found", "Failed to delete post", 404));
  }
  await db.deletePost(userId, postId);

  res.json({
    success: true,
    user: req.user.username,
    message: "Post deleted",
  });
});

const createComment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log("REQ USER FROM COMMENT REQUEST", req.user);
  const postId = req.params.postId;
  const { content } = req.body;

  const comment = await db.createComment(userId, postId, content);

  if (!comment) {
    next(new CustomError("Not Found", "Failed to create comment", 404));
  } else {
    res.json({
      success: true,
      user: req.user.username,
      message: "Created comment",
      comment: comment,
    });
  }
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentId;
  const comment = await db.getComment(commentId);

  if (!comment) {
    return next(new CustomError("Not Found", "Failed to delete comment", 404));
  }
  await db.deleteComment(commentId);

  res.json({
    success: true,
    user: req.user.username,
    message: "Comment deleted",
  });
});

const postAPIKey = asyncHandler(async (req, res) => {
  res.json({
    apiKey: process.env.TINY_MCE_API_KEY
  })
})

module.exports = {
  getAllPosts,
  getPost,
  getPostComments,
  createNewPost,
  editPost,
  patchPost,
  deletePost,
  createComment,
  deleteComment,
  postAPIKey
};
