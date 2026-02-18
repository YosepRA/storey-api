const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const productSnapshotSchema = new Schema({
  originalId: { type: Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  netto: Number,
  pricePerUnit: Number,
  unit: {
    _id: Types.ObjectId,
    name: String,
    abbreviation: String,
  },
  qty: Number,
  subtotal: Number,
  store: {
    _id: Types.ObjectId,
    name: String,
    address: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = productSnapshotSchema;
