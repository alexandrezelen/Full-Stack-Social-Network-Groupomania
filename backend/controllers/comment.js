const express = require("express");
const router = express.Router();
const db = require('../models');
const Comment = db.comment;
const User = db.user;

exports.createComment = async (req, res) => {
    const comment = { text: req.body.text, UserId: req.UserId, PostId: Number(req.params.postId) };
    try {
        let createComment = await Comment.create(comment);
        let userData = await User.findOne({ attributes: { exclude: ['password'] }, where: { id: req.UserId } });
        res.status(201).json({ userData, message: "Commentaire créé" });
    }
    catch (err) { err => res.status(400).json(err); }
};

exports.getAllComments = async (req, res) => {
    try {
        await Comment.findAll({
            include: [
                { model: User, attributes: { exclude: ["password"] } }
            ],
            where: { PostId: req.params.postId }
        })
            .then(comments => res.status(200).json(comments));
    }
    catch (err) { err => res.status(400).json(err); }
};

exports.deleteComment = async (req, res, next) => {
    await Comment.findOne({ where: { id: req.params.id } })
        .then((comment) => { req.commentCreatorId = comment.UserId; })
        .catch(err => res.status(400).json(err));

    if (req.UserId !== req.commentCreatorId && req.isAdmin !== true) {
        res.status(400).json({ message: "Non autorisé" });
        return;
    }
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Le commentaire a été supprimé" }))
        .catch(err => res.status(400).json(err));
};