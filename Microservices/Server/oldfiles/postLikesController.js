class PostLikesController {
    constructor(postLikesRepository) {
        this.postLikesRepository = postLikesRepository;
    }
    async getPostLikes(req, res) {
        try {
            const result = await this.postLikesRepository.getPostLikes(req);
            res.json(result.recordset);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addPostLike(req, res) {
        try {
            const result = await this.postLikesRepository.addPostLike(req);
            res.json(result);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    } async removePostLike(req, res) {
        try {
            const result = await this.postLikesRepository.removePostLike(req);
            res.json(result);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

module.exports = PostLikesController;
