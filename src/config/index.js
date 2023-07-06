const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
};
