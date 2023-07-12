const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  categories: {
    type: [String],
    default: ['food', 'beverage', 'vegetables', 'dairy', 'meat', 'fruit'],
  },
  units: {
    type: [String],
    default: ['g', 'kg', 'ml', 'l', 'pcs'],
  },
  stores: [String],
  otp: String,
});

userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);

module.exports = User;
