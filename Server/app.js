const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const mainRouter = require('./routes/main.routes.js')

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(mainRouter);

module.exports = app;
