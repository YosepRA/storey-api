const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  images: [
    {
      publicId: String,
      url: String,
    },
  ],
  categories: [{ _id: Schema.Types.ObjectId, name: String }],
  price: { type: Number, required: true },
  netto: { type: Number, required: true },
  unit: { _id: Schema.Types.ObjectId, name: String, abbreviation: String },
  pricePerUnit: { type: Number, required: true }, // Calculate on client-side.
  store: { _id: Schema.Types.ObjectId, name: String, address: String }, // Also add to user's store list.
  pinned: { type: Boolean, default: false }, // Default to false.
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  lastUpdatedAt: { type: Date, default: Date.now },
});

productSchema.plugin(mongoosePaginate);

productSchema.pre('findOneAndUpdate', function lastUpdatedAtPreHook(next) {
  this.set({ lastUpdatedAt: new Date() });

  next();
});

const Product = model('Product', productSchema);

module.exports = Product;
