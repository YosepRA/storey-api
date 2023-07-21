const { Product } = require('../models/index.js');
const { promiseResolver } = require('../utils/helpers.js');
const errorCode = require('../types/error-code.js');

module.exports = {
  async index(req, res) {
    const { page, search, sort, cat, store } = req.query;
    const { _id: userId } = req.user;
    const limit = 15;
    const query = { author: userId };
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
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
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

    if (product === null) {
      return res.json({
        status: 'error',
        code: errorCode.noDataFound,
        message: 'No data found.',
      });
    }

    return res.json({
      status: 'ok',
      data: product,
    });
  },
  async create(req, res) {
    const data = req.body;
    const { _id: userId } = req.user;

    data.author = userId;

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
    const { id } = req.params;
    const data = req.body;

    const [oldProduct, updateError] = await promiseResolver(
      Product.findByIdAndUpdate(id, data),
    );

    if (updateError) {
      console.log(updateError);
      return res.json({
        status: 'error',
        code: errorCode.serverError,
        message: 'Server error',
      });
    }

    return res.json({
      status: 'ok',
    });
  },
  async updatePrice(req, res) {
    const { id } = req.params;
    const { price } = req.body;

    const [product, queryError] = await promiseResolver(Product.findById(id));

    if (queryError) {
      console.log(queryError);
      return res.json({
        status: 'error',
        code: errorCode.serverError,
        message: 'Server error',
      });
    }

    if (product === null) {
      return res.json({
        status: 'error',
        code: errorCode.noDataFound,
        message: 'No data found.',
      });
    }

    const pricePerUnit = price / product.netto;

    product.price = price;
    product.pricePerUnit = pricePerUnit;

    const [savedProduct, saveError] = await promiseResolver(product.save());

    return res.json({
      status: 'ok',
    });
  },
  async delete(req, res) {
    const { id } = req.params;

    const [deletedProduct, deleteError] = await promiseResolver(
      Product.findByIdAndDelete(id),
    );

    return res.json({
      status: 'ok',
    });
  },
  uploadImage(req, res) {
    res.send('Product image upload.');
  },
  deleteImage(req, res) {
    res.send('Product image delete.');
  },
};
