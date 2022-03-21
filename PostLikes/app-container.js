const awilix = require("awilix");
const container = awilix.createContainer();
const postLikesService = require("./services/postLikesService");
const postLikesController = require("./controllers/postLikesController");

container.register({
  postLikesService: awilix.asClass(postLikesService).singleton(),
  postLikesController: awilix.asClass(postLikesController).singleton(),
});

module.exports = container;
