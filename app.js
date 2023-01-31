const express = require('express');
const rootRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', rootRouter);

module.exports = app;