const awilix = require("awilix");
const container = awilix.createContainer();
const PostService = require("./services/postService");

const setup = () => {
  console.log('container');
  container.register({
    postService: awilix.asClass(PostService).singleton()
  });
}

module.exports = { setup, container};
