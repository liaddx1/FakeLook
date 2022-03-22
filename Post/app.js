const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const PostController = require('./controllers/postController');



app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



app.get('/getAllPosts', function(req, res) {
    const result = PostController.getAllPosts(req);
    res.status(200).send(String(result));
 });

app.post('/addPost', function(req, res) {
    const result = PostController.addPost(req);
    res.status(200).send(String(result));
 });

app.post('/searchPost', function(req, res) {
    const result = PostController.searchPosts(req);
    res.status(200).send(String(result));
 });

app.get('/getPost', function(req, res) {
    const result = PostController.getPost(req);
    res.status(200).send(result);
 });




module.exports = app;
