const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  photo: [String],
  categories: [String],
  price: { type: Number, required: true },
  netto: { type: Number, required: true },
  unit: { type: String, required: true },
  pricePerUnit: { type: Number, required: true }, // Calculate on client-side.
  store: String, // Also add to user's store list.
  pinned: Boolean, // Default to false.
  created: Date,
});

const Product = model('Product', productSchema);

module.exports = Product;
