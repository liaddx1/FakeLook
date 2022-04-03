class PostLikesController {
    constructor({ postLikesService }) {
        this.postLikesService = postLikesService;
    }

    async getPostLikes(req, res) {
        try {
            const result = await this.postLikesService.getPostLikes(req);
            return JSON.stringify(result);
        }
        catch (error) {
            console.log(`There Was a Problem getting post likes. error: ${error.message}`);
            return (`Failed to get post likes, error: ${error.message}`);
        }
    }
    async addPostLike(req, res) {
        try {
            const result = await this.postLikesService.addPostLike(req);
            return JSON.stringify(result);
        }
        catch (error) {
            console.log(`There Was a Problem getting post likes. error: ${error.message}`);
            return ({ message: `Cannot Like More Than Once!` });
        }
    } async removePostLike(req, res) {
        try {
            const result = await this.postLikesService.removePostLike(req);
            return JSON.stringify(result);
        }
        catch (error) {
            console.log(`There Was a Problem getting post likes. error: ${error.message}`);
            return ({ message: `Cannot Dislike This Item!` });
        }
    }
}

module.exports = PostLikesController;