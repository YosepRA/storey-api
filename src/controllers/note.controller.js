const { Note } = require('#models/index.js');
const { promiseResolver } = require('#utils/index.js');

function createProductSnapshot(products) {
  return products.map(({ product, qty, subtotal }) => ({
    originalId: product._id,
    name: product.name,
    price: product.price,
    netto: product.netto,
    pricePerUnit: product.pricePerUnit,
    unit: product.unit,
    qty,
    subtotal,
    store: product.store,
    createdAt: new Date(),
  }));
}

function calculateNoteTotalPrice(productSnapshots) {
  return productSnapshots.reduce((acc, product) => acc + product.subtotal, 0);
}

module.exports = {
  async index(req, res) {
    const { page, limit, sort } = req.query;
    const { _id: userId } = req.user;

    const query = { author: userId };
    const pageOption = page ? parseInt(page, 10) : 1;
    const limitOption = limit ? parseInt(limit, 10) : 10;
    const sortOption = sort || '-createdAt';

    const options = {
      page: pageOption,
      sort: sortOption,
      limit: limitOption,
    };

    const [notes, queryError] = await promiseResolver(
      Note.paginate(query, options),
    );

    if (queryError) {
      return res.status(500).json({
        status: 'error',
        message: `Note index query error: ${queryError.message}`,
      });
    }

    return res.json({
      status: 'ok',
      data: {
        docs: notes.docs,
        page: notes.page,
        limit: notes.limit,
        totalDocs: notes.totalDocs,
      },
    });
  },
  async details(req, res) {
    const { id } = req.params;

    const [note, queryError] = await promiseResolver(Note.findById(id));

    if (queryError) {
      return res.status(500).json({
        status: 'error',
        message: `Note details query error: ${queryError.message}`,
      });
    }

    if (note === null) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found.',
      });
    }

    return res.json({
      status: 'ok',
      data: note,
    });
  },
  async create(req, res) {
    const {
      body: data,
      user: { _id: userId },
    } = req;

    /* 
      1. Create product snapshot from raw products array
      2. Construct new input object from original body, product snapshot, and total price
      3. Add author to input data
    */

    const productSnapshots = createProductSnapshot(data.products);
    const noteInput = {
      title: data.title,
      description: data.description || '',
      products: productSnapshots,
      totalPrice: calculateNoteTotalPrice(productSnapshots),
      author: userId,
    };

    const [result, createError] = await promiseResolver(Note.create(noteInput));

    if (createError) {
      return res.status(500).json({
        status: 'error',
        message: `Note create error: ${createError.message}`,
      });
    }

    return res.status(201).json({
      status: 'ok',
      data: result,
    });
  },
  async update(req, res) {
    /* 
      1. Get remaining old product and new products.
      2. Create product snapshots for the new products.
      3. Merge old product snapshots with the new ones.
      4. Build update object alongside other update fields other than the products.
      5. Send update query to the database.
    */

    const { id } = req.params;
    const { remainingOldProducts, newProducts, ...noteUpdateRest } = req.body;

    let products;

    if (remainingOldProducts || newProducts) {
      const newProductSnapshots =
        newProducts?.length > 0 ? createProductSnapshot(newProducts) : [];

      products = remainingOldProducts
        ? remainingOldProducts.concat(newProductSnapshots)
        : newProductSnapshots;
    }

    const totalPrice = products ? calculateNoteTotalPrice(products) : undefined;

    const update = { ...noteUpdateRest, products, totalPrice };
    const updateOptions = { new: true };

    const [note, updateError] = await promiseResolver(
      Note.findByIdAndUpdate(id, update, updateOptions),
    );

    if (updateError) {
      console.log(updateError);

      return res.status(500).json({
        status: 'error',
        message: `Note update error: ${updateError.message}`,
      });
    }

    if (note === null) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found.',
      });
    }

    return res.json({
      status: 'ok',
      data: note,
    });
  },
  async delete(req, res) {
    const { id } = req.params;

    const [deletedNote, deleteError] = await promiseResolver(
      Note.findByIdAndDelete(id),
    );

    if (deleteError) {
      return res.status(500).json({
        status: 'error',
        message: `Note delete error: ${deleteError.message}`,
      });
    }

    if (deletedNote === null) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found.',
      });
    }

    return res.sendStatus(204);
  },
};
