const noAuthUserRouter = require('express').Router();
const { container } = require('../app-container');
const userController = container.resolve('userController');

noAuthUserRouter.get('/all', userController.getAllUsers);
noAuthUserRouter.post('/changePassword', userController.changePassword);
noAuthUserRouter.get('/:userEmail', userController.getUserByEmail);

module.exports = noAuthUserRouter;