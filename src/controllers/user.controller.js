const {
  Types: { ObjectId },
} = require('mongoose');

const { User } = require('#models/index.js');
const { promiseResolver } = require('#utils/helpers.js');

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

    req.login(registeredUser, (sessionError) => {
      if (sessionError) {
        return res.status(500).json({
          status: 'error',
          message: 'Session creation error.',
        });
      }

      return res.json({
        status: 'ok',
        data: {
          username: registeredUser.username,
        },
      });
    });

    return undefined;
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
  logout(req, res) {
    req.logout(() => {
      res.sendStatus(204);
    });
  },
  // requestOTP(req, res) {
  //   res.send('User request OTP.');
  // },
  // verifyOTP(req, res) {
  //   res.send('User verify OTP.');
  // },
  async createCategory(req, res) {
    const { user, body } = req;

    const category = { name: body.trim().toLowerCase() };

    const userFilter = { username: user.username };
    const update = { $push: { categories: category } };
    const options = {
      projection: { categories: { $slice: -1 } },
      new: true,
    };

    const [updatedUser, updateError] = await promiseResolver(
      User.findOneAndUpdate(userFilter, update, options),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User category create error.',
      });
    }

    return res.status(201).json({
      status: 'ok',
      data: updatedUser.categories[0],
    });
  },
  async updateCategory(req, res) {
    const {
      params: { id },
      user,
      body,
    } = req;

    const categoryName = body.trim().toLowerCase();
    const targetCategory = user.categories.find(
      (cat) => cat._id.toString() === id,
    );

    targetCategory.name = categoryName;

    const [result, saveError] = await promiseResolver(user.save());

    if (saveError) {
      return res.status(500).json({
        status: 'error',
        message: 'User category update: Save error.',
      });
    }

    return res.sendStatus(204);
  },
  async deleteCategory(req, res) {
    const {
      params: { id },
      user,
    } = req;

    const userFilter = { username: user.username };
    const update = { $pull: { categories: { _id: new ObjectId(id) } } };

    const [result, updateError] = await promiseResolver(
      User.findOneAndUpdate(userFilter, update),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User category delete: Update error.',
      });
    }

    return res.sendStatus(204);
  },
  createUnit(req, res) {
    res.send('User create unit measurement.');
  },
  updateUnit(req, res) {
    res.send('User update unit measurement.');
  },
  deleteUnit(req, res) {
    res.send('User delete unit measurement.');
  },
  createStore(req, res) {
    res.send('User create store.');
  },
  updateStore(req, res) {
    res.send('User update store.');
  },
  deleteStore(req, res) {
    res.send('User delete store.');
  },
};
