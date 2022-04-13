const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const { container } = require('./app-container');
const postLikesController = container.resolve('postLikesController');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/getPostLikes', async function(req, res) {
    res.send(await postLikesController.getPostLikes(req)).status(200);
 });

app.post('/addPostLike', async function(req, res) {
    res.send(await postLikesController.addPostLike(req)).status(200);
 });

app.delete('/deletePostLike', async function(req, res) {
    res.send(await postLikesController.removePostLike(req)).status(200);
 });


module.exports = app;
