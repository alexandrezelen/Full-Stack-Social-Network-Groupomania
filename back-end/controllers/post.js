const { Posts } = require('../models');

exports.createPost = async (req, res, next) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
};

exports.getAllPosts = async (req, res, next) => {
    const post = await Posts.findAll();
    res.json(post);
};

exports.getPostById = async (req, res, next) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
};

// exports.deletePost = async (req, res, next) => {
//     const post = await Posts.findAll()
//     res.json(post);
// };

// exports.updatePost = async (req, res, next) => {
//     const post = await Posts.findAll()
//     res.json(post);
// };