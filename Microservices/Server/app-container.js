const awilix = require('awilix');
const container = awilix.createContainer();

const UserController = require('./controllers/userController');
const UserRepository = require('./dal/userRepository');

const AuthController = require('./controllers/authController');

const PostController = require('./controllers/postController');
const PostRepository = require('./dal/postRepository');

const CommentController = require('./controllers/commentController');
const CommentRepository = require('./dal/commentRepository');

const PostLikesController = require('./controllers/postLikesController');
const PostLikesRepository = require('./dal/postLikesRepository');


const setup = () => {
    container.register({
        userController: awilix.asClass(UserController).singleton(),
        userRepository: awilix.asClass(UserRepository).singleton(),

        authController: awilix.asClass(AuthController).singleton(),

        postController: awilix.asClass(PostController).singleton(),
        postRepository: awilix.asClass(PostRepository).singleton(),

        commentController: awilix.asClass(CommentController).singleton(),
        commentRepository: awilix.asClass(CommentRepository).singleton(),

        postLikesController: awilix.asClass(PostLikesController).singleton(),
        postLikesRepository: awilix.asClass(PostLikesRepository).singleton(),
    });
}



module.exports = { setup, container };