const postRouter = require('express').Router();
const { container } = require('../app-container');
const postController = container.resolve('postController');
const commentController = container.resolve('commentController');
const postLikesController = container.resolve('postLikesController');
const authMiddleware = require('../middlewares/auth-user');

postRouter.use(authMiddleware);

postRouter.get('/:userId', postController.getAllPosts);
postRouter.post('/', postController.addPost);
postRouter.get('/search/:searchParams', postController.searchPosts);
postRouter.get('/:postId', postController.getPost);

postRouter.get('/:postId/comments/:userId', commentController.getAllComments);
postRouter.post('/:postId/comments', commentController.addComment);

postRouter.put('/comments/:commentId/likes', commentController.addCommentLike);
postRouter.delete('/comments/:commentId/likes', commentController.removeCommentLike);

postRouter.get('/:postId/likes', postLikesController.getPostLikes);
postRouter.put('/:postId/likes', postLikesController.addPostLike);
postRouter.delete('/:postId/likes', postLikesController.removePostLike);

module.exports = postRouter;