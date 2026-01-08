const mongoose = require('mongoose');

const { expirationDate } = require('#utils/helpers.js');

const { Schema, model } = mongoose;

const otpSchema = new Schema({
  email: String,
  otp: String,
  expired: { type: Date, default: expirationDate(5 * 60 * 60 * 1000) },
});

const OTP = model('OTP', otpSchema);

module.exports = OTP;
