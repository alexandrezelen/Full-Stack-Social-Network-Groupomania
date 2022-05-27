const express = require("express");
const router = express.Router();
const db = require('../models');
const User = db.user;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config();
const passwordSchema = require('../middlewares/password-validator.js');
const { sign } = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    console.log(req.body)
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
    if (!user) { return res.status(400).json({ error: "Utilisateur non trouvé" }); }
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) { return res.status(401).json({ error: "Email et/ou mot de passe incorrect(s)" }); }
        const accessToken = sign(
            { UserId: user.id },
            process.env.SECRET_TOKEN,
            { expiresIn: '24h' }
        );
        res.json(accessToken);
    });
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
    const userObject = req.file ? {
        ...req.body.user,
        profilePicture: `${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (user.id !== req.UserId && req.isAdmin !== true) { return res.status(401).json({ error }); }
            User.update({ ...userObject }, { where: { id: req.params.id } })
                .then((user) => res.status(201).json({
                    user: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        department: user.department,
                        profilePicture: userUpdated.profilePicture
                    }
                }))
                .catch(error => res.status(405).json({ error }));
            // .then(() => {
            //     User.findOne({ where: { id: req.params.id } })
            //         .then((updatedUser) => {
            //             const updatedProfile = {
            //                 firstname: updatedUser.firstname,
            //                 lastname: updatedUser.lastname,
            //                 email: updatedUser.email,
            //                 department: updatedUser.department,
            //                 profilePicture: updatedUser.profilePicture
            //             };
            //             res.status(200).jsonres.status(201).json
            //         })
            //         .catch(err => res.status(400).json(err));
            // })
            // .catch(err => res.status(405).json({ err }));
        })
        .catch(err => res.status(418).json({ err }));
};

exports.deleteUser = (req, res, next) => {
    if (req.UserId != req.params.id && req.isAdmin !== true) { return res.status(400).json({ message: "Non autorisé" }); }
    User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Profil supprimé' }))
        .catch(error => res.status(403).json({ error }));
};