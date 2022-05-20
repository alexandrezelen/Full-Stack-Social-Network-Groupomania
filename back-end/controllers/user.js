const express = require("express");
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const passwordSchema = require('../middlewares/password-validator.js');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    let passwordIsOk = passwordSchema.validate(req.body.password);
    if (!passwordIsOk) { return res.status(400).json({ error: "The password must be 8 to 50 caractere" }); }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            Users.create({
                email: req.body.email,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            })
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });
    if (!user) { return res.status(400).json({ error: "User Doesn't Exist" }); }
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) { return res.status(401).json({ error: "Wrong Username And Password Combination" }); }
        return res.status(200).json({ token: jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, { expiresIn: '24h' }) });
    });
};


exports.getProfile = (req, res, next) => {
    Users.findOne({where: { id: req.params.id } })
    .then((user) => {
        let profile = user.dataValues;
        return res.status(200).json({profile: profile, userId: req.userId})
    })
    .catch(err => res.status(418).json(err))
};

exports.updateUser = (req, res, next) => {
    /**
     * vérifier que le user qui souhaite updater soit le bon user (soit l'admin) 
     * (mutualiser avec une fonction bien précise).
     * Pour l'update de l'image de profil, créer une route spécifique.
     */
};

exports.deleteUser = (req, res, next) => {
    Users.findOne({ where: { id: req.params.id} })
    .then((user) => { 
        if( req.params.id !== req.userId ) { return res.signup.status(400).json({message : "Vous n'avez pas les privilèges requis."}) }
        Users.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "User deleted"}))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
};