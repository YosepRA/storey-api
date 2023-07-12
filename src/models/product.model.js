const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  images: [String],
  categories: [String],
  price: { type: Number, required: true },
  netto: { type: Number, required: true },
  unit: { type: String, required: true },
  pricePerUnit: { type: Number, required: true }, // Calculate on client-side.
  store: String, // Also add to user's store list.
  pinned: Boolean, // Default to false.
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  created: Date,
});

productSchema.plugin(mongoosePaginate);

const Product = model('Product', productSchema);

module.exports = Product;
