const awilix = require("awilix");
const container = awilix.createContainer();
const authService = require("./services/authService");
const authController = require("./controllers/authController");

container.register({
  authService: awilix.asClass(authService).singleton(),
  authController: awilix.asClass(authController).singleton(),
});

module.exports = container;
