const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = process.env.KEY;

class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    addUser = async (req) => {
        console.log('in adding a user');
        console.log(AuthService);
        try {
            let hashedPassword = bcrypt.hashSync(req.body.password);
            req.body.password = hashedPassword;
            const result = await this.authService.addUser(req);
            console.log(result);
            let token = jwt.sign({ userId: result.recordset[0].userId }, key, {
                expiresIn: 600
            });
            return { auth: true, userId: result.recordset[0].userId, authToken: token };
        }
        catch (error) {
            console.log(error.message);
            return 'There Was a Problem Registering The User.';
        }
    }
    userLogIn = async (req) => {
        console.log('In user login');
        try {
            const result = await this.authService.userLogIn(req);
            console.log(result);
            if (!result.recordset[0]) return { message: 'User Was Not Found In Our System.', auth: false };
            let passwordIsValid = bcrypt.compareSync(req.body.password, result.recordset[0].password);

            if (!passwordIsValid) return { message: 'Password Incorrect.', auth: false };
            let token = jwt.sign({ userId: result.recordset[0].userId }, key, {
                expiresIn: 600
            });

            return { auth: true, userId: result.recordset[0].userId, authToken: token };
        }
        catch (error) {
            console.log(error.message);
            // retrurn error.message;
        }
    }
}

module.exports = AuthController;