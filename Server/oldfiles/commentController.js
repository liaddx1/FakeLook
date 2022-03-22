class CommentController {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    
    async getAllComments(req, res) {
        try {
            const result = await this.commentRepository.getAllComments(req);
            res.json(result.recordset);
        }
        catch (error) {
            res.status(500)
            res.send(error.message) //make it send error.stack in dev
        }
    }
    async addComment(req, res) {
        try {
            const result = await this.commentRepository.addComment(req);
            res.json(result);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addCommentLike(req, res) {
        try {
            const result = await this.commentRepository.addCommentLike(req);
            res.json(result);
            // console.log(res);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async removeCommentLike(req, res) {
        try {
            const result = await this.commentRepository.removeCommentLike(req);
            res.json(result);
            // console.log(res);
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

module.exports = CommentController;