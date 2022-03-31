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
            return JSON.stringify((await this.postLikesService.addPostLike(req)));
        }
        catch (error) {
            console.log(`There Was a Problem getting post likes. error: ${error.message}`);
            return (`Failed to add post likes, error: ${error.message}`);
        }

    } async removePostLike(req, res) {
        try {
            return JSON.stringify((await this.postLikesService.removePostLike(req)));
        }
        catch (error) {
            console.log(`There Was a Problem getting post likes. error: ${error.message}`);
            return (`Failed to remove post likes, error: ${error.message}`);
        }
    }
}

module.exports = PostLikesController;