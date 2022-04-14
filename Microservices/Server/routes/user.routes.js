const userRouter = require('express').Router();
const { container } = require('../app-container');
const authMiddleware = require('../middlewares/auth-user');
const userController = container.resolve('userController');

userRouter.use(authMiddleware);

/**
* @swagger
* /api/users/all:
*   get:
*    summary: get all users name + userId.
*    tags: [Users]
*    description: use to request all register users first and last name + userId
*    responses:
*       '200': 
*           description: a successful response
*           content:
*               application/json:
*                   schema:
*                       type: array
*                       items:
*                           $ref: '#/components/schemas/User'
*/
userRouter.get('/all', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *  get:
 *      summary: get a spesific user by userId
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The user id
 *      responses:
 *          200:
 *              description: The user description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: The user was not found
 */
userRouter.get('/:userId', userController.getUserById);

/**
 * @swagger
 * /api/users/{searchParams}:
 *  get:
 *      summary: get a list of users by params
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: params
 *          schema:
 *              type: string
 *          required: true
 *          description: Params
 *      responses:
 *          200:
 *              description: Array of users that match the params
 *              contens:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          400:
 *              description: No users was found
 */
userRouter.get('/:searchParams', userController.searchUsers);


/**
 * @swagger
 * /api/users/changePic:
 *  put:
 *      summary: Changes user's profile picture
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true;
 *          description: The user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The picture was succssfully changed
 *          404:
 *              description: The user was not found
 *          500:
 *              description: Some Server Error
 */
userRouter.put('/changePic', userController.changeUserPicture);

module.exports = userRouter;