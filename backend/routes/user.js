const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getProfile);
router.put('/update/:id', auth, multer, userCtrl.updateUser);
router.put('/password/:id', auth, userCtrl.updatePassword);
router.put('/picture/:id', auth, multer, userCtrl.updateProfilePicture);
router.delete('/delete/:id', auth, userCtrl.deleteUser);

module.exports = router;