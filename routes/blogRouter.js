const { Router } = require("express");
const blogRouter = Router();
const blogController = require("../controllers/blogController");
const passport = require("passport");

blogRouter.get("/", blogController.getAllPosts);
blogRouter.get(
  "/:postId",
  // passport.authenticate("jwt", { session: false }),
  blogController.getPost,
);

blogRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogController.createNewPost,
);

blogRouter.post(
  "/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  blogController.createComment,
);

// ADD AUTHENTICATION
blogRouter.post(
  '/api-key', 
  passport.authenticate("jwt", { session: false }),
  blogController.postAPIKey
)

blogRouter.put("/:postId", blogController.editPost);

blogRouter.patch(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  blogController.patchPost
);

blogRouter.delete(
  "/:postId", 
  passport.authenticate("jwt", { session: false }),
  blogController.deletePost
);

blogRouter.delete(
  "/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  blogController.deleteComment
)

module.exports = blogRouter;
