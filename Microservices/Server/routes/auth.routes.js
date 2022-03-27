const authRouter = require('express').Router();
const { container } = require('../app-container');
const authController = container.resolve('authController');

authRouter.post('/register', authController.addUser);
authRouter.post('/login', authController.userLogIn);

module.exports = authRouter;