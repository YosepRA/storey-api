const { User } = require('../models/index.js');
const { promiseResolver } = require('../utils/helpers.js');

module.exports = {
  async register(req, res) {
    const userData = req.body;

    const [registeredUser, registerError] = await promiseResolver(
      User.register(new User(userData), userData.password),
    );

    if (registerError) {
      return res.json({
        status: 'error',
        message: registerError.message,
      });
    }

    return res.json({
      status: 'ok',
      data: {
        username: registeredUser.username,
      },
    });
  },
  login(req, res) {
    const { username } = req.user;

    res.json({
      status: 'ok',
      data: {
        username,
      },
    });
  },
  async logout(req, res) {
    req.logout(() => {
      res.json({
        status: 'ok',
      });
    });
  },
  requestOTP(req, res) {
    res.send('User request OTP.');
  },
  verifyOTP(req, res) {
    res.send('User verify OTP.');
  },
  createCategory(req, res) {
    res.send('User create category.');
  },
  deleteCategory(req, res) {
    res.send('User delete category.');
  },
  createUnit(req, res) {
    res.send('User unit measurement.');
  },
  deleteUnit(req, res) {
    res.send('User delete unit measurement.');
  },
  createStore(req, res) {
    res.send('User create store.');
  },
  deleteStore(req, res) {
    res.send('User delete store.');
  },
};
