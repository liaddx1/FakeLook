const bcrypt = require('bcryptjs');
const httpService = require('../Services/httpService')
const userRoute = `${process.env.BASEURL}:${process.env.USERPOSTPORT}`;
const axios = require('axios');
class UserController {
    async getAllUsers(req, res) {
        try {
            await httpService.get(`${userRoute}/all`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)
        }
    }
    async changeUserPicture(req, res) {
        try {
            await httpService.post(`${userRoute}/changePic`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)
        }
    }
    async searchUsers(req, res) {
        try {
            await httpService.get(`${userRoute}/searchUser`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)
        }
    }

    async getUserById(req, res) {
        try {
            await httpService.get(`${userRoute}/getUserId/${req.params.userId}`).then((response) => {
                res.status(200).send(response.data.recordset[0]);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    async getUserByEmail(req, res) {
        try {
            console.log(req.params.userEmail);
            await httpService.get(`${userRoute}/getUserByEmail/${req.params.userEmail}`).then((response) => {
                if (response.data.recordsets[0].length > 0)
                    res.status(200).send(response.data.recordsets[0]);
                else
                    res.status(200).send({ message: 'User Was Not Found In Our System!' });
            })
                .catch((error) => { res.status(200).send({ message: error.message }) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)
        }
    }

    async changePassword(req, res) {
        try {
            let hashedPassword = bcrypt.hashSync(req.body.user.password);
            req.body.user.password = hashedPassword;
            await httpService.post(`${userRoute}/changePassword`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    // async changePassword(req, res) {
    //     try {
    //         const result = await this.userRepository.changePassword(req);
    //         res.json(result.rowsAffected);
    //     }
    //     catch (error) {
    //         res.status(500);
    //         res.send(error.message);
    //     }
    // }
}

module.exports = UserController;