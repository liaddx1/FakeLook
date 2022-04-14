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

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *  post:
 *      summary: Add new comment
 *      tags: [Comments]
 *      parameters:
 *          - in: path
 *            name: postId
 *            schema:
 *                  type: string
 *            required: true
 *            description: Post id to add the comment into
 *      requestBody:
 *          required: true
 *          name: New Comment
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comment'
 *      responses:
 *          200:
 *              description: The comment was succssfully added
 *          500:
 *              description: Some Server Error
 */
postRouter.post('/:postId/comments', commentController.addComment);

/**
 * @swagger
 * /api/posts/comments/{commentId}/likes:
 *  put:
 *      summary: Add a like into a comment
 *      tags: [Comments]
 *      parameters:
 *        - in: path
 *          name: commentId
 *          schema:
 *              type: string
 *          required: true;
 *          description: Comment Id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comment'
 *      responses:
 *          200:
 *              description: The comment was succssfully changed
 *          404:
 *              description: The comment was not found
 *          500:
 *              description: Some Server Error
 */
postRouter.put('/comments/:commentId/likes', commentController.addCommentLike);

/**
 * @swagger
 * /api/posts/comments/{commentId}/likes:
 *  delete:
 *         summary: Removes a like from a comment
 *         tags: [Comments]
 *         parameters:
 *           - in: path
 *             name: commentId
 *             schema:
 *                 type: string
 *             required: true;
 *             description: Comment Id
 *         responses:
 *             200:
 *                 description: The comment was succssfully changed
 *             404:
 *                 description: The comment was not found
 *             500:
 *                 description: Some Server Error
 */
postRouter.delete('/comments/:commentId/likes', commentController.removeCommentLike);

/**
* @swagger
* /api/posts/{postId}/likes:
*   get:
*    summary: Get all likes by postId
*    tags: [Posts]
*    description:  Get array of post likes that is related to spesific postId
*    responses:
*       '200': 
*           description: a successful response
*           content:
*               application/json:
*                   schema:
*                       type: array
*                       items:
*                           $ref: '#/components/schemas/Post'
*       404:
*           description: post was not found
*/
postRouter.get('/:postId/likes', postLikesController.getPostLikes);

/**
 * @swagger
 * /api/posts/{postId}/likes:
 *  put:
 *      summary: Add a like into a post
 *      tags: [Posts]
 *      parameters:
 *        - in: path
 *          name: postId
 *          schema:
 *              type: string
 *          required: true;
 *          description: Post Id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *              description: The post was succssfully changed
 *          404:
 *              description: The post was not found
 *          500:
 *              description: Some Server Error
 */
postRouter.put('/:postId/likes', postLikesController.addPostLike);

/**
 * @swagger
 * /api/posts/{postId}/likes:
 *  delete:
 *         summary: Removes a like from a post
 *         tags: [Posts]
 *         parameters:
 *           - in: path
 *             name: postId
 *             schema:
 *                 type: string
 *             required: true;
 *             description: Comment Id
 *         responses:
 *             200:
 *                 description: The post was succssfully changed
 *             404:
 *                 description: The post was not found
 *             500:
 *                 description: Some Server Error
 */
postRouter.delete('/:postId/likes', postLikesController.removePostLike);

module.exports = postRouter;