const jwt = require('jsonwebtoken');
const key = process.env.KEY;

module.exports = verifyUser = (req, res, next) => {
    let token = req.header('authToken');
    console.log(token.length > 0 ? "Valid Token" : 'Invalid Token');
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
