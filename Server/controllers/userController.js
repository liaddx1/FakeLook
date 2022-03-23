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
            await httpService.get(`${userRoute}/getUserId`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)        
        }
    }
    async changePassword(req, res) {
        try {
            let hashedPassword = bcrypt.hashSync(req.body.password);
            req.body.password = hashedPassword;
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