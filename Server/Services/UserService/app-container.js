const awilix = require("awilix");
const container = awilix.createContainer();
const userService = require("./services/userService");
const userController = require("./controllers/userController");

container.register({
  userService: awilix.asClass(userService).singleton(),
  userController: awilix.asClass(userController).singleton(),
});

module.exports = container;
