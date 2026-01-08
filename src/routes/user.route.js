const express = require('express');
const passport = require('passport');

const { user: controller } = require('#controllers/index.js');
const { user: userMiddleware } = require('#middlewares/index.js');

const router = express.Router();

/* ======================= Routes ======================= */

router.post('/register', controller.register);

router.post('/login', passport.authenticate('local'), controller.login);

router.get('/logout', controller.logout);

// router.post('/otp/request', controller.requestOTP);

// router.post('/otp/verify', controller.verifyOTP);

router.post('/category', userMiddleware.isLoggedIn, controller.createCategory);

router.delete(
  '/category/:id',
  userMiddleware.isLoggedIn,
  controller.deleteCategory,
);

router.post('/unit', userMiddleware.isLoggedIn, controller.createUnit);

router.delete('/unit/:id', userMiddleware.isLoggedIn, controller.deleteUnit);

router.post('/store', userMiddleware.isLoggedIn, controller.createStore);

router.delete('/store/:id', userMiddleware.isLoggedIn, controller.deleteStore);

module.exports = router;
