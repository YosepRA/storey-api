const express = require('express');

const {
  user: userMiddleware,
  validateObjectId,
} = require('#middlewares/index.js');
const { note: controller } = require('#controllers/index.js');

const router = express.Router();

/* ======================= Middlewares ======================= */

router.use(userMiddleware.isLoggedIn);

/* ======================= Routes ======================= */

router.get('/', controller.index);

router.get('/:id', validateObjectId('id'), controller.details);

router.post('/', controller.create);

router.put('/:id', validateObjectId('id'), controller.update);

router.delete('/:id', validateObjectId('id'), controller.delete);

module.exports = router;
