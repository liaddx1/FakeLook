const jwt = require('jsonwebtoken');
const key = process.env.KEY;

module.exports = verifyUser = (req, res, next) => {
    let token = req.header('authToken');
    console.log('in JWT');
    if (!token) return ({ auth: false, message: "Token was not provided." });

    jwt.verify(token, key, (err, decoded) => {
        if (err) return ({ auth: false, message: "Authintication Failed." });

        req.userId = decoded.userId;
        console.log(req.userId);

        next();
    });
}
