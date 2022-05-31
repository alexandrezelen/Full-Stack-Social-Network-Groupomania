const express = require("express");
const router = express.Router();
const db = require('../models');
const Post = db.post;
const User = db.user;
const Comment = db.comment;
const fs = require('fs');

exports.createPost = async (req, res) => {
    console.log(req.body);
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
    // noter les attributes
    Post.findAll({ include: [{ model: User }, { model: Comment, include: { model: User } }] })
        .then(posts => { return res.status(200).json(posts); })
        .catch(err => { return res.status(400).json(err); });
};

exports.getOnePost = (req, res, next) => {

    // noter les attributes
    const id = req.params.id;
    Post.findOne({ include: [{ model: User }, { model: Comment, include: { model: User } }] }, { where: { id: id } })
        .then(post => { return res.status(200).json(post); })
        .catch(err => { return res.status(400).json(err); });
};

exports.updatePost = (req, res) => {
    if (req.UserId != req.params.id && req.isAdmin !== true) { return res.status(400).json({ message: "Non autorisé" }); }
    const bodyObject = req.file ? {
        ...req.body,
        profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };
    console.log({ ...bodyObject });
    Post.update({ ...bodyObject }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post modifié' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = async (req, res, id=0, imageName="") => {
    await Post.findOne({where: { id: req.params.id }})
        .then((post) => { imageName = post.postImage; id = post.UserId })
        .catch(err => res.status(400).json(err))
    if (req.UserId != id && req.isAdmin !== true) { return res.status(400).json({ message: "Non autorisé" }) }
    await fs.unlink(`images/${imageName}`,()=>{})
    Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Le post a été supprimé" }))
        .catch(err => res.status(400).json({ err }));  
};