const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getProfile/:id', auth, userCtrl.getProfile);
router.put('/updateUser/:id', auth, userCtrl.updateUser);
router.delete('/deleteUser/:id', auth, userCtrl.deleteUser);

module.exports = router;