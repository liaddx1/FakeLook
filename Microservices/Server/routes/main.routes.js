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
 * 
 *      Post:
 *          type: object
 *          required:
 *              - userId
 *              - latGPS
 *              - longGPS
 *              - picture
 *              - description
 *          properties:
 *              userId:
 *                  type: number
 *                  description: The auto-generated id from the db
 *              latGPS:
 *                  type: string
 *                  description: The post lattitude data
 *              longGPS:
 *                  type: string
 *                  description: The post longtitude data
 *              picture:
 *                  type: string
 *                  description: The posted picture in base64 format
 *              description:
 *                  type: string
 *                  description: The post description
 *          example:
 *              userId: 2375
 *              latGPS: 37.41512
 *              longGPS: 42.48244
 *              picture: 4dgdg4sdf65g4fsdgfds2g4sd5
 *              description: post description goes right here, yay
 * 
 *      Auth:
 *          type: object
 *          required:
 *              - auth
 *              - userId
 *              - authToken
 *              - user
 *          properties:
 *              auth:
 *                  type: bool
 *                  description: Is authorized to login
 *              userId:
 *                  type: number
 *                  description: Logined userId
 *              authToken:
 *                  type: string
 *                  description: Logined user authToken
 *              user:
 *                  type:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *                  description: User
 *      
 *      Comment:
 *          type: object
 *          required:
 *              - postId
 *              - userId
 *              - commentContent
 *          properties:
 *              postId:
 *                  type: number
 *                  description: Post id
 *              userId:
 *                  type: number
 *                  description: User id
 *              commentContent:
 *                  type: string
 *                  description: comment content
 *      
 *      Login:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: Email
 *              password:
 *                  type: string
 *                  description: Password
 * 
 *  securitySchemes:
 *      authToken:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */


/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The auth managing API
 */
mainRouter.use('/api/auth', authRouter);

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */
mainRouter.use('/api/users', userRouter);

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: The posts managing API
 */

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: The comments managing API
 */
mainRouter.use('/api/posts', postRouter);

mainRouter.use('/api/noAuthPosts', noAuthpostRouter);
mainRouter.use('/api/noAuthUser', noAuthUserRouter);

module.exports = mainRouter;