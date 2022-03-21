const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = process.env.KEY;
const container = require("../app-container");
const userService = container.resolve('userService');


class UserController {

    async getAllUsers(req, res) {
        try {
            const result = await userService.getAllUsers();
            res.json(result.recordset);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    async changeUserPicture(req, res) {
        try {
            const result = await userService.ChangeUserPicture(req);
            res.send(result.rowsAffected);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    async searchUsers(req, res) {
        try {
            const result = await userService.SearchUsers(req);
            res.json(result.recordset);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    async getUserById(req, res) {
        try {
            const result = await userService.getUserById(req);
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
            const result = await userService.changePassword(req);
            res.json(result.rowsAffected);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    async changePassword(req, res) {
        try {
            const result = await userService.changePassword(req);
            res.json(result.rowsAffected);
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

module.exports = UserController;