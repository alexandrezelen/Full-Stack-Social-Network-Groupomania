const dotenv = require('dotenv').config();
const express = require('express');
const server = require('./server');
const app = express();
const path = require('path');
const db = require('./models');
const cors = require('cors');
const helmet = require("helmet");

// -- Importation du routeur -- //
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

// -- CORS -- //
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// -- Middlewares -- //
app.use(express.json());
app.use(cors());
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
}));
app.use('/images', express.static(path.join(__dirname, 'images')));

// -- Routes -- //
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

// to auto reset : { force: true }
// to modify only the specified { alter: true }
db.sequelize.sync({ alter: true })
    .then(server)
    .catch(err => console.log({ err }));

module.exports = app;