const { Product } = require('../models/index.js');
const { promiseResolver } = require('../utils/helpers.js');

module.exports = {
  async index(req, res) {
    res.send('Product index');
  },
  async details(req, res) {
    res.send('Product details ID:', req.params.id);
  },
  async create(req, res) {
    res.send('Product create.');
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
