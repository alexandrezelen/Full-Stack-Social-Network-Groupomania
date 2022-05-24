const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comment');

router.post('/', auth, commentCtrl.createComment);
router.get('/:postId', commentCtrl.getAllComments);
router.put('/:id', auth, commentCtrl.updateComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;