const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = process.env.KEY;
const httpService = require('../Services/httpService')
const authRoute = `${process.env.BASEURL}:${process.env.AUTHPORT}`;
const axios = require('axios');

class AuthController {
    addUser = async (req, res) => {
        console.log('in adding a user');
        try {
            await httpService.post(`${authRoute}/register`, req.body).then((response) => {
                if (!response.data.auth)
                    res.status(200).send({ auth: false, message: "There Was a Problem Registering The User." })
                if (response.data.auth)
                    res.status(200).send({ auth: true, userId: response.data.userId, authToken: response.data.authToken });
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send("There Was a Problem Registering The User.");
        }
    }
    userLogIn = async (req, res) => {
        console.log('In user login');
        try {
            await axios.post('http://localhost:8081/login', req.body).then((response) => {
                console.log(response.data);
                if (!response.data.auth)
                    res.status(200).send({ message: response.data.message, auth: false });

                if (response.data.auth)
                    res.status(200).send({ auth: true, userId: response.data.userId, authToken: response.data.authToken });
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

module.exports = AuthController;