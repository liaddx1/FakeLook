const jwt = require('jsonwebtoken');
const key = process.env.KEY ? process.env.KEY : null;

module.exports = verifyUser = (req, res, next) => {
    let token = req.header('authToken');
    if (!token) return res.status(401).send({ auth: false, message: "Token was not provided." });

    jwt.verify(token, key, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: "Authintication Failed." });

        req.userId = decoded.userId;
        console.log(req.userId);

        next();
    })
}
