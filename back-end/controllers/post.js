const { Posts } = require('../models');

exports.createPost = async (req, res, next) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
};

exports.getAllPosts = async (req, res, next) => {
    const post = await Posts.findAll()
    res.json(post);
};