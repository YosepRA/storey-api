require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const logger = require('morgan');

const config = require('./config/index.js');
const mongoConnect = require('./lib/mongoose/mongo-connect.js');
const startPassport = require('./lib/passport/index.js');
const {
  home: homeRouter,
  product: productRouter,
  note: noteRouter,
  user: userRouter,
} = require('./routes/index.js');

const app = express();

const port = config.port || 3000;

/* ======================= Database Connection ======================= */

mongoConnect(config.mongoUrl);

let sessionSecretKey = config.sessionSecret;

if (sessionSecretKey === undefined) {
  sessionSecretKey = 'unsafe_session_secret';
  console.log(
    'You are using an unsafe session secret key. Please provide session secret key as an environment variable.',
  );
}

const sessionConfig = {
  secret: sessionSecretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 24 * 60 * 60 * 1000,
  },
  store: new MongoStore({ mongoUrl: config.mongoUrl }),
};

/* ======================= Middlewares ======================= */

app.use(logger('dev'));
app.use(express.json());
app.use(session(sessionConfig));

/* ======================= Passport ======================= */

const passport = startPassport();

app.use(passport.initialize());
app.use(passport.session());

/* ========== Routes ========== */

app.use('/', homeRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/notes', noteRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port} ...`);
});
