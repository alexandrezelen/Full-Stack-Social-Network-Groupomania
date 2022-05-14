const express = require('express');
const server = require('./server');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const db = require('./models');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

// to auto reset : { force: true }
// to modify only the specified { alter: true }
db.sequelize.sync({ force: true })
    .then(server)
    .catch(err => console.log({ err }));

module.exports = app;