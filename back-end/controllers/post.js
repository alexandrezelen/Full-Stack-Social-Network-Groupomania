const express = require("express");
const router = express.Router();
const { Posts } = require('../models');

exports.createPost = async (req, res) => {
    try {
        await Posts.create(req.body);
        res.json({
            "message": "Post Created"
        });
    } catch (err) {
        console.log(err);
    }
}

// exports.createPost = async (req, res, next) => {
//     const post = req.body;
//     await Posts.create(post)
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

exports.getAllPosts = async (req, res, next) => {
    const post = await Posts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        });
};

exports.getPostById = async (req, res, next) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
};

exports.updatePost = (req, res) => {
    const id = req.params.id;
    Posts.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};

exports.deletePost = (req, res) => {
    const id = req.params.id;
    Posts.destroy({
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