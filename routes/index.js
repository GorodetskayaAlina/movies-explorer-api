const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации
router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

// авторизация
router.use(auth);

// роуты, которым авторизация нужна
router.use('/', require('./users'));
router.use('/', require('./movies'));

router.use('*', (req, res, next) => { next(new NotFoundError('Страница не найдена')); });

module.exports = router;
