const express = require('express');
const passport = require('passport');

const { user: controller } = require('../controllers/index.js');

const router = express.Router();

/* ======================= Routes ======================= */

router.post('/register', controller.register);

router.post('/login', passport.authenticate('local'), controller.login);

router.get('/logout', controller.logout);

module.exports = router;
