const awilix = require("awilix");
const container = awilix.createContainer();
const PostLikesService = require("./services/postLikesService");
const PostLikesController = require("./controllers/postLikesController");

const setup = () => {
  console.log('container');
  container.register({
    postLikesService: awilix.asClass(PostLikesService).singleton(),
    postLikesController: awilix.asClass(PostLikesController).singleton(),
  });
}

module.exports = { setup, container};
