const awilix = require("awilix");
const container = awilix.createContainer();
const PostLikesService = require("./services/postLikesService");

const setup = () => {
  console.log('container');
  container.register({
    postLikesService: awilix.asClass(PostLikesService).singleton()
  });
}

module.exports = { setup, container};
