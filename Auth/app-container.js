const awilix = require("awilix");
const container = awilix.createContainer();
const authService = require("./services/authService");

const setup = () => {
  console.log('container');
  container.register({
    authService: awilix.asClass(authService).singleton()
  });
}

module.exports = { setup, container};
