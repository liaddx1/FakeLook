const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = process.env.KEY;
const container = require("../app-container");
const authService = container.resolve('authService');


class AuthController {

    addUser = async (req, res) => {
        console.log('in adding a user');
        try {
            let hashedPassword = bcrypt.hashSync(req.body.password);
            req.body.password = hashedPassword;
            const result = await authService.addUser(req);
            console.log(result);
            let token = jwt.sign({ userId: result.recordset[0].userId }, key, {
                expiresIn: 600
            });
            res.status(200).send({ auth: true, userId: result.recordset[0].userId, authToken: token });
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
            const result = await authService.userLogIn(req);
            if (!result.recordset[0]) return res.status(200).send({ message: 'User Was Not Found In Our System.', auth: false });
            let passwordIsValid = bcrypt.compareSync(req.body.password, result.recordset[0].password);

            if (!passwordIsValid) return res.status(200).send({ message: 'Password Incorrect.', auth: false });
            let token = jwt.sign({ userId: result.recordset[0].userId }, key, {
                expiresIn: 600
            });

            res.status(200).send({ auth: true, userId: result.recordset[0].userId, authToken: token });
        }
        catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

module.exports = AuthController;