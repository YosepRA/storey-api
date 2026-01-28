const { Product } = require('#models/index.js');
const { promiseResolver } = require('#utils/helpers.js');

// const error = require('../types/error-code.js');

module.exports = {
  async index(req, res) {
    const { page, search, sort, cat, store, limit } = req.query;
    const { _id: userId } = req.user;

    const pageOption = page || 1;
    const sortOption = sort || '-createdAt';
    const limitOption = limit || 10;

    const query = { author: userId };
    const paginationOptions = {
      page: pageOption,
      sort: sortOption,
      limit: limitOption,
    };

    const [products, queryError] = await promiseResolver(
      Product.paginate(query, paginationOptions),
    );

    if (queryError) {
      return res.status(500).json({
        status: 'error',
        message: queryError.message,
      });
    }

    return res.json({
      status: 'ok',
      data: {
        docs: products.docs,
        page: products.page,
        limit: products.limit,
        totalDocs: products.totalDocs,
      },
    });
  },
  async details(req, res) {
    const { id } = req.params;

    const [product, queryError] = await promiseResolver(Product.findById(id));

    if (queryError) {
      return res.status(500).json({
        status: 'error',
        message: queryError.message,
      });
    }

    if (product === null) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found.',
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
      return res.status(500).json({
        status: 'error',
        message: 'Product create error.',
      });
    }

    return res.status(201).json({
      status: 'ok',
      data: product,
    });
  },
  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    const [product, updateError] = await promiseResolver(
      Product.findByIdAndUpdate(id, data, { new: true }),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'Product update error.',
      });
    }

    if (product === null) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found.',
      });
    }

    return res.json({
      status: 'ok',
      data: product,
    });
  },
  async updatePrice(req, res) {
    const { id } = req.params;
    const { price } = req.body;

    const [product, findError] = await promiseResolver(Product.findById(id));

    if (findError) {
      return res.status(500).json({
        status: 'error',
        message: 'Product update price find product error.',
      });
    }

    if (product === null) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    const pricePerUnit = Math.round((price / product.netto) * 100) / 100;

    product.price = price;
    product.pricePerUnit = pricePerUnit;

    const [savedProduct, saveError] = await promiseResolver(product.save());

    if (saveError) {
      return res.status(500).json({
        status: 'error',
        message: 'Product update price save product error.',
      });
    }

    return res.json({
      status: 'ok',
      data: {
        _id: savedProduct._id,
        price: savedProduct.price,
        netto: savedProduct.netto,
        unit: savedProduct.unit,
        pricePerUnit: savedProduct.pricePerUnit,
      },
    });
  },
  async delete(req, res) {
    const { id } = req.params;

    const [deletedProduct, deleteError] = await promiseResolver(
      Product.findByIdAndDelete(id),
    );

    if (deleteError) {
      return res.status(500).json({
        status: 'error',
        message: 'Product delete error.',
      });
    }

    if (deletedProduct === null) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found.',
      });
    }

    return res.json({
      status: 'ok',
      data: deletedProduct,
    });
  },
  // uploadImage(req, res) {
  //   res.send('Product image upload.');
  // },
  // deleteImage(req, res) {
  //   res.send('Product image delete.');
  // },
};
