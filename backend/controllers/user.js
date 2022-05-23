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

exports.checkUser = (req, res, next) => {
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
        //return res.status(200).json({ token: jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, { expiresIn: '24h' }) });
    });
};


exports.getProfile = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            let profile = user.dataValues;
            return res.status(200).json({ profile: profile, userId: req.userId });
        })
        .catch(err => res.status(418).json(err));
};

exports.updateUser = (req, res, next) => {
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

exports.updatePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ where: { email: req.user.email } });

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if (!match) res.json({ error: "Mauvais mot de passe" });
    });

    bcrypt.hash(newPassword, 10).then((hash) => {
        User.update(
            { password: hash },
            { where: { email: req.user.email } }
        );
        res.json('Mail modifié');
    });
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