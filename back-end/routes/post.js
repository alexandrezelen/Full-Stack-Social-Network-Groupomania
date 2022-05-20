const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

router.post('/', postCtrl.createPost);
router.put('/update', postCtrl.updatePost);
router.delete('/delete', postCtrl.deletePost);
router.get('/byId/:id', postCtrl.getPostById);
router.get('/', postCtrl.getAllPosts);

module.exports = router;