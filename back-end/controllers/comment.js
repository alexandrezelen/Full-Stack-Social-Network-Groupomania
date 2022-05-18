const { Comments } = require('../models');

exports.getComment = async (req, res, next) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { postId: postId } });
    res.json(comments);
};

exports.createComment = async (req, res, next) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
};

// exports.getAllPosts = async (req, res, next) => {
//     const post = await Posts.findAll();
//     res.json(post);
// };

// exports.getPostById = async (req, res, next) => {
//     const id = req.params.id;
//     const post = await Posts.findByPk(id);
//     res.json(post);
// };

// exports.deletePost = async (req, res, next) => {
//     const post = await Posts.findAll()
//     res.json(post);
// };

// exports.updatePost = async (req, res, next) => {
//     const post = await Posts.findAll()
//     res.json(post);
// };