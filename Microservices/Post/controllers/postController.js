class PostController {
    constructor({ postService }) {
        this.postService = postService;
    }

    async getAllPosts(req, res) {
        try {
            const result = await this.postService.getAllPosts(req);
            return JSON.stringify(result.recordset);
        }
        catch (error) {
            console.log(`There Was a Problem getting the posts. error: ${error.message}`);
            return (`Failed to get posts, error: ${error.message}`);
        }
    }
    async addPost(req, res) {
        try {
            return JSON.stringify((await this.postService.addPost(req)));
        }
        catch (error) {
            return (`Failed to add the post, error: ${error.message}`);
        }
    }
    async getPost(req, res) {
        try {
            return JSON.stringify((await this.postService.getPost(req)).recordset);
        }
        catch {
            console.log(`There Was a Problem getting the post. error: ${error.message}`);
            return (`Failed to getting the post, error: ${error.message}`);
        }
    }
    async searchPosts(req, res) {
        try {
            const result = await this.postService.SearchPosts(req);
            return JSON.stringify(result.recordset);
        }
        catch (error) {
            console.log(`There Was a Problem searching for posts. error: ${error.message}`);
            return (`Failed to search for posts, error: ${error.message}`);
        }
    }
}

module.exports = PostController;