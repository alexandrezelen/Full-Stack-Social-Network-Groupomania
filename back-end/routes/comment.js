const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.get('/:postId', commentCtrl.getComment);
router.post('/', commentCtrl.createComment);
// router.post('/login', auth, userCtrl.login);
// router.get('/getProfile', auth, userCtrl.getUser);
// router.get('/updateUser', auth, userCtrl.updateUser);
// router.get('/deleteUser', auth, userCtrl.deleteUser);

module.exports = router;