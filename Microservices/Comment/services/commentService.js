const { sql, poolPromise } = require('./connectionHandler');

class commentService {
    async getAllComments(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            // .input('userId', sql.Int, req.userId)
            .input('postId', sql.Int, req.params.postId)
            .input('userId', sql.Int, req.params.userId)
            .execute('allComments')
        return result;
    }

    async addComment(req) {
        console.log(req.body, req.params);
        const pool = await poolPromise;
        const result = await pool.request()
            .input('postId', sql.Int, req.params.postId)
            .input('userId', sql.Int, req.body.userId)
            .input('commentContent', sql.VarChar(50), req.body.comment.commentContent)
            .execute('addComment')
        return result;
    }

    async addCommentLike(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.body.userId)
            .input('commentId', sql.Int, req.body.commentId)
            .execute('addCommentLike')
        return result;
    }

    async removeCommentLike(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.body.userId)
            .input('commentId', sql.Int, req.body.commentId)
            .execute('removeCommentLike')
        return result;
    }

}

module.exports = commentService;