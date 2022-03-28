const awilix = require("awilix");
const container = awilix.createContainer();
const commentService = require("./services/commentService");
const commentController = require("./controllers/commentController");

const setup = () => {
  container.register({
    commentService: awilix.asClass(commentService).singleton(),
    commentController: awilix.asClass(commentController).singleton()
  });
}

module.exports = { setup, container};
