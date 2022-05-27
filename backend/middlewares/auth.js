const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');
const User = db.user;

module.exports = (req, res, next) => {
    try {
        const token = req.header("accessToken");
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const UserId = decodedToken.UserId;
        User.findOne({ where : { id : UserId}})
        .then((profile)=> {
           if (req.body.UserId && req.body.UserId !== UserId) {
            throw 'User ID non valable !';
            } else {
                req.UserId = UserId;
                req.isAdmin = profile.dataValues.isAdmin;
                next();
        } })
        .catch(err => res.status(404).json(err))

    } catch {
        res.status(401).json({
            error: new Error('Requête non authentifiée !')
        });
    }
};