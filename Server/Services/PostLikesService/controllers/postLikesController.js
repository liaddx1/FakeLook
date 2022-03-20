const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = process.env.KEY;
const container = require("../app-container");
const postLikesService = container.resolve('postLikesService');


class PostLikesController {

    async getPostLikes(req, res) {
        try {
            const result = await postLikesService.getPostLikes(req);
            res.json(result.recordset);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addPostLike(req, res) {
        try {
            const result = await postLikesService.addPostLike(req);
            res.json(result);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    } async removePostLike(req, res) {
        try {
            const result = await postLikesService.removePostLike(req);
            res.json(result);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

module.exports = PostLikesController;