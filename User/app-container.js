const awilix = require("awilix");
const container = awilix.createContainer();
const UserService = require("./services/userService");

const setup = () => {
  console.log('container');
  container.register({
    userService: awilix.asClass(UserService).singleton()
  });
}

module.exports = { setup, container};
