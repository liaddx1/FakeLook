const authRouter = require('express').Router();
const { container } = require('../app-container');
const authController = container.resolve('authController');

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Registers a new user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          name: New User
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user has succssfully register
 *          500:
 *              description: Some Server Error
 */
authRouter.post('/register', authController.addUser);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Log in a user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          name: Log In
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: The user has succssfully login
 *          500:
 *              description: Some Server Error
 */
authRouter.post('/login', authController.userLogIn);

module.exports = authRouter;