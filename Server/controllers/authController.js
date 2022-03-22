const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = process.env.KEY;
const httpService = require('../Services/httpService')
const authRoute = `${process.env.BASEURL}/${process.env.AUTHPORT}`
const axios = require('axios');

class AuthController {
    addUser = async (req, res) => {
        console.log('in adding a user');
        try {
            const result = await httpService.post(`${authRoute}/register`, req).then((response) => {
                res.status(200).send({ auth: true, userId: response.recordset[0].userId, authToken: token });
            })
            .catch((error) => {console.log(error)})
            console.log(result);
        }
        catch (error) {
            res.status(500);
            console.log(error.stack);
            res.send("There Was a Problem Registering The User.");
        }
    }
    userLogIn = async (req, res) => {
        console.log('In user login');
        try {
            const result = await axios.post('http://localhost:8081/login', req).then((response) => {
                res.status(200).send({ auth: true, userId: response.recordset[0].userId, authToken: token });
            })
            .catch((error) => {console.log(error)})
            console.log(result);    
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

module.exports = AuthController;