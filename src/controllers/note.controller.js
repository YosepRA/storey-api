const { Note } = require('../models/index.js');
const { promiseResolver } = require('../utils/helpers.js');
const errorCode = require('../types/error-code.js');

module.exports = {
  async index(req, res) {
    const { page, sort } = req.query;
    const { _id: userId } = req.user;
    const limit = 15;
    const query = { author: userId };
    const options = { page, sort, limit };

    const [notes, queryError] = await promiseResolver(
      Note.paginate(query, options),
    );

    if (queryError) {
      console.log(queryError);
      return res.json({
        status: 'error',
        code: errorCode.serverError,
        message: 'Server error.',
      });
    }

    return res.json({
      status: 'ok',
      page,
      length: notes.docs.length,
      total: notes.totalDocs,
      hasPrevPage: notes.hasPrevPage,
      hasNextPage: notes.hasNextPage,
      data: notes.docs,
    });
  },
  async details(req, res) {
    const { id } = req.params;

    const [note, queryError] = await promiseResolver(Note.findById(id));

    if (queryError) {
      console.log(queryError);
      return res.json({
        status: 'error',
        code: errorCode.serverError,
        message: 'Server error',
      });
    }

    if (note === null) {
      return res.json({
        status: 'error',
        code: errorCode.noDataFound,
        message: 'No data found.',
      });
    }

    return res.json({
      status: 'ok',
      data: note,
    });
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
