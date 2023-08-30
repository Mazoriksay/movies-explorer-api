const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const celebrates = require('../middlewares/celebrates');
const { createUser, login, signOut } = require('../controllers/users');

router.post('/signin', celebrates.signIn, login);
router.post('/signup', celebrates.signUp, createUser);
router.get('/signout', signOut);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
