const passport = require('passport');

const { User } = require('#models/index.js');

function startPassport() {
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  return passport;
}

module.exports = startPassport;
