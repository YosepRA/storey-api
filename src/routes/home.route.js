const express = require('express');

const { home: homeController } = require('../controllers/index.js');
const { user: userMiddleware } = require('../middlewares/index.js');

const router = express.Router();

/* ======================= Routes ======================= */

router.get('/test', homeController.test);

router.get('/protected', userMiddleware.isLoggedIn, homeController.protected);

module.exports = router;
