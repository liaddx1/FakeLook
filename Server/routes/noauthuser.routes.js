const noAuthUserRouter = require('express').Router();
const { container } = require('../app-container');
const userController = container.resolve('userController');

noAuthUserRouter.post('/changePassword', userController.changePassword);
noAuthUserRouter.get('/getUserByEmail', userController.getUserByEmail);

module.exports = noAuthUserRouter;