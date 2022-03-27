const awilix = require('awilix');
const container = awilix.createContainer();

const AuthController = require("./controllers/authController");
const AuthService = require('./services/authService');

const setup = () => {
  container.register({
    authController: awilix.asClass(AuthController).singleton(),
    authService: awilix.asClass(AuthService).singleton(),
  });
}

module.exports = { setup, container };
