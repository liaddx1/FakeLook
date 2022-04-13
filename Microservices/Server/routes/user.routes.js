const userRouter = require('express').Router();
const { container } = require('../app-container');
const authMiddleware = require('../middlewares/auth-user');
const userController = container.resolve('userController');

userRouter.use(authMiddleware);
//routs:
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
userRouter.get('/:userId', userController.getUserById);
userRouter.get('/:searchParams', userController.searchUsers);
userRouter.post('/changePic', userController.changeUserPicture);

module.exports = userRouter;