const express = require("express");
const router = express.Router();
const db = require('../models');
const User = db.user;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config();
const passwordSchema = require('../middlewares/password-validator.js');
const { sign } = require('jsonwebtoken');

exports.signup = (req, res, next) => {
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
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getMe = (req, res, next) => {
    // reprendre la méthode de getProfile
    const user = { id: req.token, role: req.role };
    res.status(200).json({ user });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) { return res.status(400).json({ error: "Utilisateur non trouvé" }); }
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) { return res.status(401).json({ error: "Email et/ou mot de passe incorrect(s)" }); }
        const accessToken = sign(
            { userId: user.id },
            process.env.SECRET_TOKEN,
            { expiresIn: '24h' }
        );
        res.json(accessToken);
    });
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
    // même méthode utilisée pour modif image, profil, mot de passe
    const id = req.params.id;
    User.findOne({ where: { id: id } })
        .then((user) => {
            if (user.dataValues.id != req.token || req.role != 1) { return res.status(400).json({ message: "L'utilisateur n'a pas les droits requis" }); }
            User.update(req.body, { where: { id: id } })
                .then(() => res.status(201).json({ message: "Utilisateur modifié" }))
                .catch(err => res.status(403).json({ error: err }));
        })
        .catch((err) => res.status(400).json(err));
};

exports.deleteUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (req.params.id !== req.userId) { return res.signup.status(400).json({ message: "Vous n'avez pas les privilèges requis." }); }
            User.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: "User deleted" }))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
};