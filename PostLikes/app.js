const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const container = require("./app-container");
const postLikesController = container.resolve('postLikesController')



app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


//config
require("dotenv").config();
const port = process.env.PORT ? process.env.PORT : 8083;
require('./app-container');

app.get('/getPostLikes', function(req, res) {
    const result = postLikesController.getPostLikes(req);
    res.status(200).send(result);
 });

app.post('/addPostLike', function(req, res) {
    const result = postLikesController.addPostLike(req);
    res.status(200).send(String(result));
 });
app.delete('/deletePostLike', function(req, res) {
    const result = postLikesController.removePostLike(req);
    res.status(200).send(String(result));
 });

//server-startup
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));


module.exports = app;
