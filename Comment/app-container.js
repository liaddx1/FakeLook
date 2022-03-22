const awilix = require("awilix");
const container = awilix.createContainer();
const commentService = require("./services/commentService");

const setup = () => {
  console.log('container');
  container.register({
    commentService: awilix.asClass(commentService).singleton()
  });
}

module.exports = { setup, container};
