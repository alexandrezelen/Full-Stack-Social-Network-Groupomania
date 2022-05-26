const express = require("express");
const router = express.Router();
const db = require('../models');
const Post = db.post;
const User = db.user;
const Comment = db.comment;
const fs = require('fs');

// exports.createPost = async (req, res, next) => {
//     const post = req.body;
//     await Post.create(post);
//     res.json(post);
// };

exports.createPost = async (req, res) => {
    console.log(req.body);
    try {
        await Post.create(req.body);
        res.status(200).json({ "message": "Post créé" });
    }
    catch (err) { console.log(err); res.status(400).json(err); }
};

// exports.createPost = (req, res, next) => {
//     const bodyObject = req.body;
//     const media = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
//     const body = new Body({
//         ...bodyObject,
//         profilePicture: media
//     });
//     body.save()
//         .then(() => res.status(201).json({ message: 'Post enregistré' }))
//         .catch(error => res.status(400).json({ error }));
// };

// exports.createPost = async (req, res, next) => {
//     const post = req.body;
//     await Post.create(post)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Post."
//             });
//         });
// };

exports.getAllPosts = (req, res) => {
    // { order: [['id', 'DESC']]}
    Post.findAll({ include: [{ model: User }, { model: Comment, include: { model: User } }] })
        .then(posts => { return res.status(200).json(posts); })
        .catch(err => { return res.status(400).json(err); });
};

// exports.getAllPosts = async (req, res, next) => {
//     const post = await Post.findAll()
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving posts."
//             });
//         });
// };

exports.getOnePost = (req, res, next) => {
    const id = req.params.id;
    Post.findOne({ include: [{ model: User }, { model: Comment, include: { model: User } }] })
        ({ where: { id: id } })
        .then(post => { return res.status(200).json(post); })
        .catch(err => { return res.status(400).json(err); });
};


exports.updatePost = (req, res) => {
    const body = req.body;
    const bodyObject = req.file ?
        {
            body: body,
            profilePicture:
                `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Post.update({ id: req.params.id }, { ...bodyObject, id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post modifié' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res) => {
    const id = req.params.id;
    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};