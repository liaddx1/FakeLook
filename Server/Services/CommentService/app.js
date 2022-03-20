const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const container = require("./app-container");
const commentController = container.resolve('commentController')



app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


//config
require("dotenv").config();
const port = process.env.PORT ? process.env.PORT : 8082;
require('./app-container');

app.get('/getAllComments', function(req, res) {
    const result = commentController.getAllComments(req);
    res.status(200).send(result);
 });

app.post('/addComment', function(req, res) {
    const result = commentController.addComment(req);
    res.status(200).send(result);
 });

app.delete('/removeLike', function(req, res) {
    const result = commentController.removeCommentLike(req);
    res.status(200).send(result);
 });

app.get('/addLike', function(req, res) {
    const result = commentController.addCommentLike(req);
    res.status(200).send(result);
 });

//server-startup
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));


module.exports = app;
