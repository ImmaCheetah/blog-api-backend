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

blogRouter.post("/", blogController.createNewPost);
blogRouter.post(
  "/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  blogController.createComment
);

blogRouter.put("/:postId", blogController.editPost);

blogRouter.delete("/:postId", blogController.deletePost);

module.exports = blogRouter;
