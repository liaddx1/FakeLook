const userRouter = require('express').Router();
const { container } = require('../app-container');
const authMiddleware = container.resolve('authMiddleware');
const userController = container.resolve('userController');

userRouter.use(authMiddleware);

userRouter.get('/all', userController.getAllUsers);
userRouter.get('/:userId', userController.getUserById);
userRouter.get('/:searchParams', userController.searchUsers);
userRouter.post('/changePic', userController.changeUserPicture);
userRouter.post('/changePassword', userController.changePassword);

module.exports = userRouter;