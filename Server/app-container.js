const awilix = require('awilix');
const container = awilix.createContainer();

const verifyUser = require('./middlewares/auth-user');

const UserController = require('./controllers/userController');
const UserRepository = require('./dal/userRepository');

const setup = () => {
    container.register({
        verifyUser: awilix.asFunction(verifyUser).singleton(),
        userController: awilix.asClass(UserController).singleton(),
        userRepository: awilix.asClass(UserRepository).singleton(),

    });
}

module.exports = { setup, container };