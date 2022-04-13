const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const { container } = require('./app-container');
const postController = container.resolve('postController');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/getAllPosts/:userId', async function(req, res) {
    res.send(await postController.getAllPosts(req)).status(200);
 });

app.post('/addPost', async function(req, res) {
    res.send(await postController.addPost(req)).status(200);
 });

app.post('/searchPost', async function(req, res) {
    res.send(await postController.searchPosts(req)).status(200);
 });

app.get('/getPost/:postId', async function(req, res) {
    res.send(await postController.getPost(req)).status(200);
 });

module.exports = app;
