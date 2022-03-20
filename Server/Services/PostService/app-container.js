const awilix = require("awilix");
const container = awilix.createContainer();
const postService = require("./services/postService");
const postController = require("./controllers/postController");

container.register({
  postService: awilix.asClass(postService).singleton(),
  postController: awilix.asClass(postController).singleton(),
});

module.exports = container;
