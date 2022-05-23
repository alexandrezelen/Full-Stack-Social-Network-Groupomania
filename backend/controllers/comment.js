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

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id} })
    .then((comment) => {
      if(req.token === comment.dataValues.userId || req.role === 2){
        Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Le commentaire à été supprimé avec succès."}))
        .catch(err => res.status(400).json(err))
      } else { res.status(400).json({ message:"Vous ne disposez pas des privilèges requis pour modifier ce commentaire." })}
    })
    .catch(err => res.status(400).json(err))
  }