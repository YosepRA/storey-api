const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const noteSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Reference from Product data.
  price: Number, // Price aggregation based on product list.
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Note = model('Note', noteSchema);

module.exports = Note;
