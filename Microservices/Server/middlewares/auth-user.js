const jwt = require('jsonwebtoken');
const key = process.env.KEY;

module.exports = verifyUser = (req, res, next) => {
    console.log('in JWT');
    let token = req.header('authToken');
    if (!token) {
        console.log("Token was not provided.");
        return;
    }

    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            console.log('Authintication Failed.');
            return;
        }

        req.userId = decoded.userId;
        next();
    });
}
