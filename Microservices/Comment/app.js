const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const { container } = require('./app-container')
const commentController = container.resolve('commentController');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.get('/getAllComments/:postId/:userId', async function (req, res) {
    res.send(await commentController.getAllComments(req)).status(200);
});

app.post('/addComment/:postId', async function (req, res) {
    res.send(await commentController.addComment(req)).status(200);
});

app.delete('/removeLike', async function (req, res) {
    res.send(await commentController.removeCommentLike(req)).status(200);
});

app.post('/addLike', async function (req, res) {
    res.send(await commentController.addCommentLike(req)).status(200);
});


module.exports = app;
