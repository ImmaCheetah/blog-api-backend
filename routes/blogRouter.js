const { Router } = require("express");
const blogRouter = Router();
const blogController = require("../controllers/blogController");

blogRouter.get('/', blogController.getAllPosts);
blogRouter.get('/:postId', blogController.getPost);

blogRouter.post('/create', blogController.createNewPost);

module.exports = blogRouter;