const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/users');
const { validationUpdateProfile } = require('../middlewares/validation');

// роуты пользователя
router.get('/users/me', getProfile);
router.patch('/users/me', validationUpdateProfile, updateProfile);

module.exports = router;
