'use strict';
const express = require('express');
const app = express();
const counters = require('./routes/counters');

app.use('/api/counters', counters);


module.exports = app;
