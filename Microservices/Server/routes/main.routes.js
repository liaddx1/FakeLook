const express = require('express');
const postRouter = require('./post.routes');
const noAuthpostRouter = require('./noAuthPost.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const noAuthUserRouter = require('./noAuthUser.routes');
const mainRouter = express.Router();

mainRouter.use('/api/posts', postRouter);
mainRouter.use('/api/noAuthPosts', noAuthpostRouter);
mainRouter.use('/api/users', userRouter);
mainRouter.use('/api/noAuthUser', noAuthUserRouter);
mainRouter.use('/api/auth', authRouter);

module.exports = mainRouter;