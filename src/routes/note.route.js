const express = require('express');

const { user: userMiddleware } = require('../middlewares/index.js');
const { note: controller } = require('../controllers/index.js');

const router = express.Router();

/* ======================= Middlewares ======================= */

router.use(userMiddleware.isLoggedIn);

/* ======================= Routes ======================= */

router.get('/', controller.index);

router.get('/:id', controller.details);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;
