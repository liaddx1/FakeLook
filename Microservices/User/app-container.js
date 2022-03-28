const awilix = require("awilix");
const container = awilix.createContainer();
const UserService = require("./services/userService");
const UserController = require("./controllers/userController");

const setup = () => {
  container.register({
    userService: awilix.asClass(UserService).singleton(),
    userController: awilix.asClass(UserController).singleton()
  });
}

module.exports = { setup, container};
