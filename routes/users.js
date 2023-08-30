const userRouter = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

userRouter.get('/me', getUser);
userRouter.patch('/me', celebrates.updateUserInfo, updateUserInfo);

module.exports = userRouter;
