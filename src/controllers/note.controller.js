const { Note } = require('#models/index.js');
const { note: service } = require('#services/index.js');
const { promiseResolver } = require('#utils/index.js');

// const error = require('../types/error-code.js');

module.exports = {
  async index(req, res) {
    const { page, sort } = req.query;
    const { _id: userId } = req.user;
    const limit = 15;
    const query = { author: userId };
    const options = {
      page,
      sort,
      limit,
      populate: {
        path: 'products',
        populate: 'product',
      },
    };

    const [notes, queryError] = await promiseResolver(
      Note.paginate(query, options),
    );

    if (queryError) {
      console.log(queryError);
      return res.json({
        status: 'error',
        // code: error.serverError.code,
        // message: error.serverError.message,
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
        // code: error.serverError.code,
        // message: error.serverError.message,
      });
    }

    if (note === null) {
      return res.json({
        status: 'error',
        // code: error.noDataFound.code,
        // message: error.noDataFound.message,
      });
    }

    return res.json({
      status: 'ok',
      data: note,
    });
  },
  async create(req, res) {
    const data = req.body;
    const { _id: userId } = req.user;

    data.author = userId;

    if (!data.price) {
      const price = await service.calculateNotePrice(data.products, res);

      data.price = price;
    }

    const [note, createError] = await promiseResolver(Note.create(data));

    if (createError) {
      console.log(createError);
      return res.json({
        status: 'error',
        // code: error.serverError.code,
        // message: error.serverError.message,
      });
    }

    return res.json({
      status: 'ok',
      data: note,
    });
  },
  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    // If user is updating the product list and there is no price.
    // Then recalculate price.
    if (data.products && !data.price) {
      const price = await service.calculateNotePrice(data.products, res);

      data.price = price;
    }

    const [oldNote, updateError] = await promiseResolver(
      Note.findByIdAndUpdate(id, data),
    );

    if (updateError) {
      console.log(updateError);
      return res.json({
        status: 'error',
        // code: error.serverError.code,
        // message: error.serverError.message,
      });
    }

    if (oldNote === null) {
      return res.json({
        status: 'error',
        // code: error.noDataFound.code,
        // message: error.noDataFound.message,
      });
    }

    return res.json({
      status: 'ok',
    });
  },
  async delete(req, res) {
    const { id } = req.params;

    const [deletedNote, deleteError] = await promiseResolver(
      Note.findByIdAndDelete(id),
    );

    return res.json({
      status: 'ok',
    });
  },
};
