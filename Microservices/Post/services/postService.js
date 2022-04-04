const { sql, poolPromise } = require('./connectionHandler');

class PostService {
    async getAllPosts(req) {
        console.log(req.params.userId);
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.params.userId)
            .execute('allPosts');
        return result;
    }

    async addPost(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.userId)
            .input('latGPS', sql.Float, req.body.latGPS)
            .input('longGPS', sql.Float, req.body.longGPS)
            .input('picture', sql.VarChar(sql.MAX), req.body.picture)
            .input('description', sql.VarChar(200), req.body.description)
            .execute('addPost');
        return result;
    }

    async getPost(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.params.userId)
            .input('postId', sql.Int, req.params.postId)
            .execute('getPostById');
        return result;
    }

    async SearchPosts(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('searchParam', sql.VarChar(100), req.params.searchParams)
            .execute('searchPosts');
        return result;
    }
}

module.exports = PostService;