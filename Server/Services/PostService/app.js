const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const container = require("./app-container");
const postController = container.resolve('postController')



app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


//config
require("dotenv").config();
const port = process.env.PORT ? process.env.PORT : 8081;
require('./app-container');

app.get('/getAllPosts', function(req, res) {
    const result = postController.getAllPosts(req);
    res.status(200).send(String(result));
 });

app.post('/addPost', function(req, res) {
    const result = postController.addPost(req);
    res.status(200).send(String(result));
 });

app.post('/searchPost', function(req, res) {
    const result = postController.searchPosts(req);
    res.status(200).send(String(result));
 });

app.get('/getPost', function(req, res) {
    const result = postController.getPost(req);
    res.status(200).send(result);
 });

//server-startup
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));


module.exports = app;
