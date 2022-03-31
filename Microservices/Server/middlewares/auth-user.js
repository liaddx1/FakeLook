const jwt = require('jsonwebtoken');
const key = process.env.KEY;

module.exports = verifyUser = (req, res, next) => {
    let token = req.header('authToken');
    console.log(token ? 'Valid Token' : `Invalid Token ${token}`);
    if (!token) 
        return{ message: 'No token provided.' };

    jwt.verify(token, key, (err, decoded) => {
        if (err)
            return { message: 'Failed to authenticate token.' };

        req.userId = decoded.userId;
        console.log(req.userId);

        next();
    });
}