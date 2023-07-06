const express = require('express');

const { home: homeController } = require('../controllers/index.js');

const router = express.Router();

/* ======================= Routes ======================= */

router.get('/', homeController.index);

module.exports = router;
