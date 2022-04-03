const { sql,poolPromise } = require('./connectionHandler');

class PostLikesService{
    async addPostLike(req){
        const pool = await poolPromise;
        const result = await pool.request()
            .input('postId', sql.Int, req.body.postId)
        .input('userId', sql.Int, req.body.userId)
        .execute('addPostLike');
         return result;
    }
    async removePostLike(req){
        const pool = await poolPromise;
        const result = await pool.request()
        .input('postId', sql.Int, req.body.postId)
            .input('userId', sql.Int, req.body.userId)
        .execute('removePostLike');
         return result;
    }
}

module.exports = PostLikesService;