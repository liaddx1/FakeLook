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

app.post('/register', async function (req, res) {
    res.send(await authController.addUser(req)).status(200);
});

app.post('/login', async function (req, res) {
    res.send(await authController.userLogIn(req)).status(200);
});

module.exports = app;
