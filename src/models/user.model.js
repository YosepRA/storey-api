const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  categories: {
    type: [{ name: String }],
    default: [
      { name: 'food' },
      { name: 'beverage' },
      { name: 'vegetables' },
      { name: 'dairy' },
      { name: 'meat' },
      { name: 'fruit' },
    ],
  },
  units: {
    type: [{ name: String }],
    default: [
      { name: 'g' },
      { name: 'kg' },
      { name: 'ml' },
      { name: 'l' },
      { name: 'pcs' },
    ],
  },
  stores: {
    type: [{ name: String }],
    default: [{ name: 'Alfamart' }, { name: 'Indomaret' }],
  },
});

userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);

module.exports = User;
