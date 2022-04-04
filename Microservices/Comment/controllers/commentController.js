class CommentController {
    constructor({ commentService }) {
        this.commentService = commentService;
    }
    async getAllComments(req, res) {
        try {
            console.log(`Getting All Comments For Post No. ${req.params.postId}`);
            const result = await this.commentService.getAllComments(req);
            return JSON.stringify(result);
        }
        catch (error) {
            console.log(`There Was a Problem getting comments. error: ${error.message}`);
            return (`failed to get comments, error: ${error.message}`)
        }
    }
    async addComment(req, res) {
        try {
            return JSON.stringify(await this.commentService.addComment(req));
        }
        catch (error) {
            console.log(`There Was a Problem adding comment. error: ${error.message}`);
            return (`failed to add comment, error: ${error.message}`)
        }
    }

    async addCommentLike(req, res) {
        try {
            const result = await this.commentService.addCommentLike(req);
            return JSON.stringify(result);
            // console.log(res);
        }
        catch (error) {
            console.log(`There Was a Problem adding comment like. error: ${error.message}`);
            return (`failed to add comment like, error: ${error.message}`)
        }
    }
    async removeCommentLike(req, res) {
        try {
            const result = await this.commentService.removeCommentLike(req);
            return JSON.stringify(result);
            // console.log(res);
        }
        catch (error) {
            console.log(`There Was a Problem removing comment like. error: ${error.message}`);
            return (`failed to remove comment like, error: ${error.message}`)
        }
    }
}

module.exports = CommentController;