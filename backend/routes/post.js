const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');

router.post('/', auth, postCtrl.createPost);
router.get('/:id', postCtrl.getPostById);
router.get('/', postCtrl.getAllPosts);
router.put('/update', auth, multer, postCtrl.updatePost);
router.delete('/delete', auth, multer, postCtrl.deletePost);

module.exports = router;