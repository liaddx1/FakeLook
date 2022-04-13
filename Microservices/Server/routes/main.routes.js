const express = require('express');
const postRouter = require('./post.routes');
const noAuthpostRouter = require('./noAuthPost.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const noAuthUserRouter = require('./noAuthUser.routes');
const mainRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - password
 *              - birthDate
 *              - address
 *              - job
 *              - picture
 *              - email
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto-generated id from the db
 *              firstName:
 *                  type: string
 *                  description: The user first name
 *              lastName:
 *                  type: string
 *                  description: The user second name
 *              password:
 *                  type: string
 *                  description: The user encrypted passowrd
 *              birthDate:
 *                  type: string
 *                  description: The user birth date
 *              address:
 *                  type: string
 *                  description: The user address
 *              job:
 *                  type: string
 *                  description: The user job
 *              picture:
 *                  type: string
 *                  description: The user base64 picture
 *              email:
 *                  type: string
 *                  description: The user email
 *          example:
 *              id: 2015
 *              firstName: liad
 *              lastName: dadon
 *              password: g4sd56gf4sdf2g1
 *              birthDate: 06/05/1998
 *              address: Bet Shemesh
 *              job: Programmer
 *              picture: g56dsf4g5sd4g5sd4g35sd4gs354g3s5
 *              email: liadd109@gmail.com 
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

mainRouter.use('/api/posts', postRouter);
mainRouter.use('/api/noAuthPosts', noAuthpostRouter);
mainRouter.use('/api/users', userRouter);
mainRouter.use('/api/noAuthUser', noAuthUserRouter);
mainRouter.use('/api/auth', authRouter);

module.exports = mainRouter;