const { Note } = require('../models/index.js');

module.exports = {
  async index(req, res) {
    res.send('Note index.');
  },
  async details(req, res) {
    res.send('Note details.');
  },
  async create(req, res) {
    res.send('Note create.');
  },
  async update(req, res) {
    res.send('Note update.');
  },
  async delete(req, res) {
    res.send('Note delete.');
  },
};
