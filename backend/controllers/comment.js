const express = require("express");
const router = express.Router();
const db = require('../models');
const Comment = db.comment;

exports.createComment = async (req, res) => {
    const comment = {
        text: req.body,
        userId: req.token,
        postId: req.params.id
    };
    try {
        await Comment.create(comment);
        res.json({
            "message": "Commentaire créé"
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comment = await Comment.findAll({
            where: {
                postId: postId
            }
        });
        res.send(comment[0]);
    } catch (err) {
        console.log(err);
    }
};

exports.updateComment = (req, res, next) => {

  }

exports.deleteComment = (req, res, next) => {
   
  }