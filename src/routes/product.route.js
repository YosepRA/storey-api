const express = require('express');

const { user: userMiddleware } = require('#middlewares/index.js');
const { product: controller } = require('#controllers/index.js');

const router = express.Router();

/* ======================= Middlewares ======================= */

router.use(userMiddleware.isLoggedIn);

/* ======================= Routes ======================= */

router.get('/', controller.index);

router.get('/:id', controller.details);

router.post('/', controller.create);

router.patch('/:id', controller.update);

router.patch('/:id/price', controller.updatePrice);

router.delete('/:id', controller.delete);

// router.post('/image', controller.uploadImage);

// router.delete('/image', controller.deleteImage);

module.exports = router;
