const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema, model } = mongoose;

const noteSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      amount: Number,
    },
  ],
  price: Number, // Price aggregation based on product list.
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created: { type: Date, default: Date.now },
});

noteSchema.plugin(mongoosePaginate);

const Note = model('Note', noteSchema);

module.exports = Note;
