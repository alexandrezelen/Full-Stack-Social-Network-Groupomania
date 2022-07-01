const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/me', auth, userCtrl.getMe);
router.get('/:id', auth, userCtrl.getProfile);
router.patch('/:id', auth, multer, userCtrl.updateUser);
router.patch('/password/:id', auth, userCtrl.updatePassword);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;