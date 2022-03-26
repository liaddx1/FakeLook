const { sql, poolPromise } = require('./connectionHandler');

class AuthService {
    async getAllUsers() {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute('allUsers');
        return result;
    }

    async userLogIn(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar(100), req.body.email)
            .execute('userLogIn');
        return result;
    }

    async getUserById(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.params.userId)
            .execute('getUser');
        return result;
    }

    async SearchUsers(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('searchParam', sql.VarChar(100), req.params.searchParams)
            .execute('searchUsers');
        return result;
    }

    async changePassword(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.userId)
            .input('password', sql.VarChar(sql.MAX), req.body.password)
            .execute('updatePassword');
        return result;
    }

    async ChangeUserPicture(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.userId)
            .input('fileUrl', sql.VarChar(sql.MAX), req.body.file)
            .execute('changeUserPicture');
        return result;
    }

    async addUser(req) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('firstName', sql.VarChar(50), req.body.firstName)
            .input('lastName', sql.VarChar(50), req.body.lastName)
            .input('password', sql.VarChar(sql.MAX), req.body.password)
            .input('birthDate', sql.Date, req.body.birthDate)
            .input('address', sql.VarChar(50), req.body.address)
            .input('job', sql.VarChar(50), req.body.job)
            .input('picture', sql.VarChar(sql.MAX), req.body.picture)
            .input('email', sql.VarChar(100), req.body.email)
            .execute('addUser');
        return result;
    }

}

module.exports = AuthService;