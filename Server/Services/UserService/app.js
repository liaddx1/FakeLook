const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const container = require("./app-container");
const userController = container.resolve('userController')



app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


//config
require("dotenv").config();
const port = process.env.PORT ? process.env.PORT : 8085;
require('./app-container');

app.get('/all', function(req, res) {
    const result = userController.getAllUsers(req);
    res.status(200).send(String(result));
 });

app.get('/getUserId', function(req, res) {
    const result = userController.getUserById(req);
    res.status(200).send(String(result));
 });

app.get('/searchUser', function(req, res) {
    const result = userController.searchUsers(req);
    res.status(200).send(String(result));
 });

app.post('/changePic', function(req, res) {
    const result = userController.changeUserPicture(req);
    res.status(200).send(String(result));
 });

app.post('/changePassword', function(req, res) {
    const result = userController.changePassword(req);
    res.status(200).send(String(result));
 });

//server-startup
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));


module.exports = app;
