class PostLikesController {
    constructor(postLikesRepository) {
        this.postLikesRepository = postLikesRepository;
    }
    async getPostLikes(req, res) {
        try {
            const result = await postLikeRepository.getPostLikes(req);
            res.json(result.recordset);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addPostLike(req, res) {
        try {
            const result = await postLikeRepository.addPostLike(req);
            res.json(result);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    } async removePostLike(req, res) {
        try {
            const result = await postLikeRepository.removePostLike(req);
            res.json(result);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

module.exports = PostLikesController;
