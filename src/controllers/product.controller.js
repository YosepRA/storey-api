const { Product } = require('../models/index.js');
const { promiseResolver } = require('../utils/helpers.js');
const errorCode = require('../types/error-code.js');

module.exports = {
  async index(req, res) {
    const { page, search, sort, cat, store } = req.query;
    const limit = 15;
    const query = {};
    const options = { page, sort, limit };

    const [products, queryError] = await promiseResolver(
      Product.paginate(query, options),
    );

    if (queryError) {
      return res.json({
        status: 'error',
        code: errorCode.serverError,
        message: 'Server error.',
      });
    }

    return res.json({
      status: 'ok',
      page,
      length: products.docs.length,
      total: products.totalDocs,
      data: products.docs,
    });
  },
  async details(req, res) {
    const { id } = req.params;

    const [product, queryError] = await promiseResolver(Product.findById(id));

    if (queryError) {
      console.log(queryError);
      return res.json({
        status: 'error',
        code: errorCode.serverError,
        message: 'Server error',
      });
    }

    return res.json({
      status: 'ok',
      data: product,
    });
  },
  async create(req, res) {
    const data = req.body;

    const [product, createError] = await promiseResolver(Product.create(data));

    if (createError) {
      console.log(createError);
      return res.json({
        status: 'error',
        code: errorCode.serverError,
        message: 'Server error',
      });
    }

    return res.json({
      status: 'ok',
      data: product,
    });
  },
  async update(req, res) {
    res.send('Product update.');
  },
  async updatePrice(req, res) {
    res.send('Product update price.');
  },
  async delete(req, res) {
    res.send('Product delete.');
  },
  uploadImage(req, res) {
    res.send('Product image upload.');
  },
  deleteImage(req, res) {
    res.send('Product image delete.');
  },
};
