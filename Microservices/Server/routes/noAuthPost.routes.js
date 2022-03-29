const noAuthPostRouter = require('express').Router();
const { container } = require('../app-container');
const postController = container.resolve('postController');

noAuthPostRouter.get('/all', postController.getAllPosts);

module.exports = noAuthPostRouter;