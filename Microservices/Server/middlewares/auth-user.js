const jwt = require('jsonwebtoken');
const key = process.env.KEY;

module.exports = verifyUser = (req, res, next) => {
    let token = req.header('authToken');
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0OTk0MDQxNCwiZXhwIjoxNzEwNjA3OTk1fQ.j3JZhksSsFheFsPA89yF3-J8j5H2XS7lkm4K80Mt8pI
    console.log(token ? 'Valid Token' : `Invalid Token ${token}`);
    if (!token) {
        console.log('No token provided.');
        return { message: 'No token provided.' };
    }

    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            console.log('Failed to authenticate token.');
            return { message: 'Failed to authenticate token.' };
        }

        req.userId = decoded.userId;
        console.log(req.userId);
        next();
    });
}