const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.updatePost);
// router.put('/title', auth, postCtrl.updateTitle);
// router.put('/text', auth, postCtrl.updateText);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;