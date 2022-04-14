const postRouter = require('express').Router();
const { container } = require('../app-container');
const postController = container.resolve('postController');
const commentController = container.resolve('commentController');
const postLikesController = container.resolve('postLikesController');
const authMiddleware = require('../middlewares/auth-user');

postRouter.use(authMiddleware);

/**
* @swagger
* /api/posts/{userId}:
*   get:
*    summary: Get all posts by userId
*    tags: [Posts]
*    description:  Get array of posts that is related to spesific user by postId
*    responses:
*       '200': 
*           description: a successful response
*           content:
*               application/json:
*                   schema:
*                       type: array
*                       items:
*                           $ref: '#/components/schemas/Post'
*/
postRouter.get('/:userId', postController.getAllPosts);

/**
 * @swagger
 * /api/posts/:
 *  post:
 *      summary: Add new post
 *      tags: [Posts]
 *      requestBody:
 *          required: true
 *          name: New Post
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *              description: The post was succssfully added
 *          500:
 *              description: Some Server Error
 */
postRouter.post('/', postController.addPost);

/**
* @swagger
* /api/posts/{searchParams}:
*   get:
*    summary: Get all posts that matches a certain params
*    tags: [Posts]
*    parameters:
*        - in: path
*          name: params
*          schema:
*              type: string
*          required: true
*          description: Params
*    description:  Get array of posts that matches a certain params
*    responses:
*       '200': 
*           description: a successful response
*           content:
*               application/json:
*                   schema:
*                       type: array
*                       items:
*                           $ref: '#/components/schemas/Post'
*/
postRouter.get('/search/:searchParams', postController.searchPosts);

/**
* @swagger
* /api/posts/{postId}:
*   get:
*    summary: Get a spesific post by postId
*    tags: [Posts]
*    parameters:
*        - in: path
*          name: postId
*          schema:
*              type: string
*          required: true
*          description: Post Id
*    description:  Get a spesific post by postId
*    responses:
*       '200': 
*           description: a successful response
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Post'
*       404:
*           description: Post was not found
*/
postRouter.get('/:postId', postController.getPost);

/**
* @swagger
* /api/posts/{postId}/comments/{userId}:
*   get:
*    summary: Get all comments by postId and user Id
*    tags: [Comments]
*    parameters:
*        - in: path
*          name: postId
*          schema:
*              type: string
*          required: true
*          description: Post Id
*        - in: path
*          name: userId
*          schema:
*              type: string
*          required: true
*          description: User Id
*    description: Get all comments by postId and user Id
*    responses:
*       200: 
*           description: a successful response
*           content:
*               application/json:
*                   schema:
*                       type: array
*                       items:
*                           $ref: '#/components/schemas/Comment'
*       404:
*           description: Comments was not found
*/
postRouter.get('/:postId/comments/:userId', commentController.getAllComments);
postRouter.post('/:postId/comments', commentController.addComment);

postRouter.put('/comments/:commentId/likes', commentController.addCommentLike);
postRouter.delete('/comments/:commentId/likes', commentController.removeCommentLike);

postRouter.get('/:postId/likes', postLikesController.getPostLikes);
postRouter.put('/:postId/likes', postLikesController.addPostLike);
postRouter.delete('/:postId/likes', postLikesController.removePostLike);

module.exports = postRouter;