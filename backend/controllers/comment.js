const express = require("express");
const router = express.Router();
const db = require('../models');
const Comment = db.comment;

exports.createComment = async (req, res) => {
    const comment = { text: req.body.text, UserId: req.UserId, PostId: Number(req.params.postId) };
    try {
        await Comment.create(comment);
        res.status(201).json({ message: "Commentaire créé" });
    }
    catch (err) { err => res.status(400).json(err); }
};

exports.getAllComments = async (req, res) => {
    try { await Comment.findAll({ where: { PostId: req.params.postId } }).then(comments => res.status(200).json(comments)); }
    catch (err) { err => res.status(400).json(err); }
};

exports.updateComment = async (req, res, next) => {
    await Comment.findOne({ where: { id: req.params.id } })
        .then((comment) => { req.commentCreatorId = comment.UserId; })
        .catch(err => res.status(400).json(err));

    if (req.UserId != req.commentCreatorId && req.isAdmin !== true) { return res.status(400).json({ message: "Non autorisé" }); }


    Comment.update({ text: req.body.text }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
        .catch(err => res.status(400).json(err));
};

exports.deleteComment = async (req, res, next) => {
    await Comment.findOne({ where: { id: req.params.id } })
        .then((comment) => { req.commentCreatorId = comment.UserId; })
        .catch(err => res.status(400).json(err));

    if (req.UserId != req.commentCreatorId && req.isAdmin !== true) { return res.status(400).json({ message: "Non autorisé" }); }

    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Le commentaire a été supprimé" }))
        .catch(err => res.status(400).json({ err }));
};