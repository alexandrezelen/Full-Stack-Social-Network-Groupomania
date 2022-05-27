const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;