const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const { container } = require('./app-container');
const authController = container.resolve('authController');



app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



app.post('/register', function(req, res) {
    const result = authController.addUser(req);
    res.status(200).send(String(result));
 });

app.post('/login', function(req, res) {
    const result = authController.userLogIn(req);
    res.status(200).send(String(result));
 });



module.exports = app;
