const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSnapshotSchema = require('./schemas/product-snapshot.schema.js');

const { Schema, model } = mongoose;

const noteSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  products: [productSnapshotSchema],
  totalPrice: Number, // Price aggregation based on product list.
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  lastUpdatedAt: { type: Date, default: Date.now },
});

noteSchema.plugin(mongoosePaginate);

noteSchema.pre('findOneAndUpdate', function lastUpdatedAtPre(next) {
  this.set({ lastUpdatedAt: new Date() });

  next();
});

const Note = model('Note', noteSchema);

module.exports = Note;
