const mongoose = require('mongoose');

function mongoConnect(mongoUrl) {
  mongoose.connect(mongoUrl).catch((error) => {
    console.error('Database connection error', error);
  });

  const db = mongoose.connection;

  db.once('open', () => console.log('Successfully connected to database'));
  db.once('disconnected', () => console.log('Database disconnected'));

  return db;
}

module.exports = mongoConnect;
