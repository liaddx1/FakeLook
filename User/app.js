const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const { container } = require('./app-container');
const userController = container.resolve('userController');


app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



app.get('/all', async function(req, res) {
    res.send(await userController.getAllUsers(req)).status(200);
 });

app.get('/getUserId', async function(req, res) {
    res.send(await userController.getUserById(req)).status(200);

 });

app.get('/searchUser', async function(req, res) {
    res.send(await userController.searchUsers(req)).status(200);
 });

app.post('/changePic', async function(req, res) {
    res.send(await userController.ChangeUserPicture(req)).status(200);
 });

app.post('/changePassword', async function(req, res) {
    res.send(await userController.changePassword(req)).status(200);
 });

app.get('/getUserByEmail', async function(req, res) {
    res.send(await userController.getUserByEmail(req)).status(200);
 });


module.exports = app;
