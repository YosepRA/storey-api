const passport = require('passport');

module.exports = {
  isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).send('You are not authenticated.');
    }

    return next();
  },
  authenticateLogin(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Login server error.',
        });
      }

      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: info?.message || 'Login credentials error.',
        });
      }

      req.login(user, (sessionError) => {
        if (sessionError) {
          return res.status(500).json({
            status: 'error',
            message: 'Session creation error.',
          });
        }

        return next();
      });

      return undefined;
    })(req, res, next);
  },
};
