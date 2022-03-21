const awilix = require("awilix");
const commentService = require("./services/commentService");
const commentController = require("./controllers/commentController");
const container = awilix.createContainer( {injectionMode: awilix.InjectionMode.CLASSIC});

container.register({
  commentService: awilix.asClass(commentService).singleton(),
  commentController: awilix.asClass(commentController).singleton(),
});

module.exports = container;
