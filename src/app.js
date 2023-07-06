require('dotenv').config();

const express = require('express');

const config = require('./config/index.js');
const mongoConnect = require('./lib/mongoose/mongo-connect.js');
const { home: homeRouter } = require('./routes/index.js');

const app = express();

const port = config.port || 3000;

mongoConnect(config.mongoUrl);

/* ========== Routes ========== */

app.use('/', homeRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port} ...`);
});
