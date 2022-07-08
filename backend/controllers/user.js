const express = require("express");
const router = express.Router();
const db = require('../models');
const User = db.user;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config();
const passwordSchema = require('../middlewares/password-validator.js');
const { sign } = require('jsonwebtoken');
const fs = require("fs");
const Post = require("../models/Post");

exports.signup = (req, res, next) => {
    console.log(req.body);
    let passwordIsOk = passwordSchema.validate(req.body.password);
    if (!passwordIsOk) { return res.status(400).json({ error: "Le mot de passe doit être contenu entre 8 et 50 caractères" }); };
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                email: req.body.email,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            })
                .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                .catch(error => res.status(400).json({ error, message: 'Impossibilité de créer le compte' }));
        })
        .catch(error => res.status(500).json({ error, message: 'Erreur de serveur' }));
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({ error: "Utilisateur non trouvé" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) { return res.status(401).json({ error: "Email et/ou mot de passe incorrect(s)" }); }
            const accessToken = sign(
                { UserId: user.id },
                process.env.SECRET_TOKEN,
                { expiresIn: '24h' }
            );
            res.json(accessToken);
        });
    }
};

exports.getMe = (req, res, next) => {
    User.findOne({ where: { id: req.UserId } })
        .then((user) => res.status(200).json({ id: user.id, isAdmin: user.isAdmin }))
        .catch(err => res.status(404).json(err));
};

exports.getProfile = (req, res, next) => {
    User.findOne({
        attributes: ["firstname", "lastname", "email"],
        where: { id: req.params.id }
    })
        .then(user => res.status(200).json({
            user
        }))
        .catch(function (err) {
            res.status(500).json({
                err, message: 'Le serveur ne récupère pas le profil'
            });
        })
        .catch(err => res.status(418).json(err));
};

exports.updateUser = (req, res, next) => {
    if (req.UserId != req.params.id && req.isAdmin !== true) { return res.status(403).json({ message: "Non autorisé" }); }
    else {
        User.update({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        }, { where: { id: req.params.id } })
            .then(user => { return res.status(200).json(user); })
            .catch(err => { return res.status(400).json(err); });
    }
};

exports.deleteUser = async (req, res, next) => {
    console.log(req.UserId);
    if (req.UserId != req.params.id && req.isAdmin !== true) { return res.status(403).json({ message: "Non autorisé" }); }
    else {
        await User.findOne({ where: { id: req.params.id } });
        User.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.status(200).json({ message: 'profil supprimé' });
            })
            .catch(err => res.status(403).json({ error }));
    }
};