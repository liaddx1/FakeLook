const bcrypt = require('bcryptjs');

class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(req, res) {
        try {
            const result = await this.userRepository.getAllUsers();
            res.json(result.recordset);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    async changeUserPicture(req, res) {
        try {
            const result = await this.userRepository.ChangeUserPicture(req);
            res.send(result.rowsAffected);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    async searchUsers(req, res) {
        try {
            const result = await this.userRepository.SearchUsers(req);
            res.json(result.recordset);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    async getUserById(req, res) {
        try {
            const result = await this.userRepository.getUserById(req);
            res.json(result.recordset);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    async changePassword(req, res) {
        try {
            let hashedPassword = bcrypt.hashSync(req.body.password);
            req.body.password = hashedPassword;
            const result = await this.userRepository.changePassword(req);
            res.json(result.rowsAffected);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    async changePassword(req, res) {
        try {
            const result = await this.userRepository.changePassword(req);
            res.json(result.rowsAffected);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

module.exports = UserController;