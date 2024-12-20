const { Router } = require("express");
const blogRouter = Router();
const blogController = require("../controllers/blogController");
const passport = require("passport");
// blogRouter.get('/', blogController.getAllPosts);

blogRouter.get("/", passport.authenticate('jwt', { session: false }), blogController.getAllPosts)

blogRouter.get('/:postId', blogController.getPost);

blogRouter.post('/', blogController.createNewPost);

blogRouter.put('/:postId', blogController.editPost);

blogRouter.delete('/:postId', blogController.deletePost);

module.exports = blogRouter;