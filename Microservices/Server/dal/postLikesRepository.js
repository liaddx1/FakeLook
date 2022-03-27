const { sql,poolPromise } = require('./connectionHandler');

class PostLikesRepository{
    async addPostLike(req){
        const pool = await poolPromise;
        const result = await pool.request()
        .input('postId',sql.Int,req.params.postId)
        .input('userId' , sql.Int ,req.userId)
        .execute('addPostLike');
         return result;
    }
    async removePostLike(req){
        const pool = await poolPromise;
        const result = await pool.request()
        .input('postId',sql.Int,req.params.postId)
        .input('userId' , sql.Int ,req.userId)
        .execute('removePostLike');
         return result;
    }
}

module.exports = PostLikesRepository;