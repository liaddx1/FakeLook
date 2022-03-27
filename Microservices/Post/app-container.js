const awilix = require("awilix");
const container = awilix.createContainer();
const PostService = require("./services/postService");
const PostController = require("./controllers/postController");

const setup = () => {
  console.log('container');
  container.register({
    postService: awilix.asClass(PostService).singleton(),
    postController: awilix.asClass(PostController).singleton(),
  });
}

module.exports = { setup, container};
