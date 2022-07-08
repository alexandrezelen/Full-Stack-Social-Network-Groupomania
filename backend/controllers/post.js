const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models');
const Post = db.post;
const User = db.user;
const Comment = db.comment;
const fs = require('fs');

exports.createPost = async (req, res) => {
    try {
        const post = {
            title: req.body.title,
            text: req.body.text,
            postImage: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""),
            UserId: req.UserId
        };
        await Post.create(post);
        res.status(200).json({ "message": "Post créé" });
    }
    catch (err) { console.log(err); res.status(400).json(err); }
};

exports.getAllPosts = (req, res) => {
    Post.findAll({
        include: [
            { model: User, attributes: { exclude: ['password'] } },
        ]
    })
        .then(posts => { return res.status(200).json(posts); })
        .catch(err => { return res.status(400).json(err); });
};

exports.getOnePost = (req, res, next) => {
    const id = req.params.id;
    Post.findOne({ include: [{ model: User, attributes: { exclude: ['password'] } }], where: { id: id } })
        .then(post => { return res.status(200).json(post); })
        .catch(err => { return res.status(400).json(err); });
};

exports.updatePost = async (req, res) => {
    let imageName = "";
    await Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            req.postCreatorId = post.UserId;
            imageName = post.postImage.split('/images/')[1];
        })
        .catch(err => res.status(400).json(err));
    if (req.UserId !== req.postCreatorId && req.isAdmin !== true) { return res.status(403).json({ message: "Non autorisé" }); }
    else {
        const bodyObject = req.file ? {
            ...req.body,
            postImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        } : { ...req.body };
        await fs.unlink(`images/${imageName}`, () => { console.log("I should have been deleted"); });
        Post.update({ ...bodyObject }, { where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post modifié' }))
            .catch(err => res.status(400).json(err));
    }
};

exports.deletePost = async (req, res, id = 0, imageName = "") => {
    await Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            req.postCreatorId = post.UserId;
            imageName = post.postImage.split('/images/')[1];
        })
        .catch(err => res.status(400).json(err));
    if (req.UserId !== req.postCreatorId && req.isAdmin !== true) { res.status(403).json({ message: "Non autorisé" }); }
    else {
        await fs.unlink(`images/${imageName}`, () => { });
        Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Le post a été supprimé" }))
            .catch(err => res.status(400).json({ err }));
    }
};

