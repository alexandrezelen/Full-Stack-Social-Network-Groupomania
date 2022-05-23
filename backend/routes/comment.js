const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comment');

router.post('/', auth, commentCtrl.createComment);
router.get('/:postId', commentCtrl.getAllComments);
router.put('/updateCommentId', auth, commentCtrl.updateComment);
router.delete('/deleteCommentId', auth, commentCtrl.deleteComment);

module.exports = router;