const express =  require('express');
const postRouter = require('./post.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const mainRouter = express.Router();

mainRouter.use('/api/posts', postRouter);
mainRouter.use('/api/users', userRouter);
mainRouter.use('/api/auth' , authRouter);

module.exports = mainRouter;