const {
  Types: { ObjectId },
} = require('mongoose');

const { User } = require('#models/index.js');
const { promiseResolver, buildArraySetOperation } = require('#utils/index.js');

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
    const userCategoryFilter = {
      username: user.username,
      'categories._id': id,
    };
    const update = {
      $set: {
        'categories.$.name': categoryName,
      },
    };

    const [result, updateError] = await promiseResolver(
      User.updateOne(userCategoryFilter, update),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User category update: Update error.',
      });
    }

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User or category is not found.',
      });
    }

    return res.sendStatus(204);
  },
  async deleteCategory(req, res) {
    const {
      params: { id },
      user,
    } = req;

    const userCategoryFilter = {
      username: user.username,
      'categories._id': id,
    };
    const update = { $pull: { categories: { _id: id } } };

    const [result, updateError] = await promiseResolver(
      User.updateOne(userCategoryFilter, update),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User category delete: Update error.',
      });
    }

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User or category is not found.',
      });
    }

    return res.sendStatus(204);
  },
  async createUnit(req, res) {
    const { body: unit, user } = req;

    const userFilter = { username: user.username };
    const update = { $push: { units: unit } };
    const options = { projection: { units: { $slice: -1 } }, new: true };

    const [result, updateError] = await promiseResolver(
      User.findOneAndUpdate(userFilter, update, options),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User unit create: Update error.',
      });
    }

    if (result === null) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
    }

    return res.status(201).json({
      status: 'ok',
      data: result.units[0],
    });
  },
  async updateUnit(req, res) {
    const {
      params: { id },
      body: unit,
      user,
    } = req;

    const userUnitFilter = { username: user.username, 'units._id': id };
    const allowedFields = ['name', 'abbreviation'];
    const setOperation = buildArraySetOperation('units', unit, allowedFields);
    const update = { $set: setOperation };

    const [result, updateError] = await promiseResolver(
      User.updateOne(userUnitFilter, update),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User unit update: Update error',
      });
    }

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User or unit is not found.',
      });
    }

    return res.sendStatus(204);
  },
  async deleteUnit(req, res) {
    const {
      params: { id },
      user,
    } = req;

    const userUnitFilter = { username: user.username, 'units._id': id };
    const update = { $pull: { units: { _id: id } } };

    const [result, updateError] = await promiseResolver(
      User.updateOne(userUnitFilter, update),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User unit delete: Update error.',
      });
    }

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User or unit is not found.',
      });
    }

    return res.sendStatus(204);
  },
  async createStore(req, res) {
    const { body: store, user } = req;

    const userFilter = { username: user.username };
    const update = { $push: { stores: store } };
    const options = { projection: { stores: { $slice: -1 } }, new: true };

    const [result, updateError] = await promiseResolver(
      User.findOneAndUpdate(userFilter, update, options),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User store create: Update error.',
      });
    }

    if (result === null) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
    }

    return res.status(201).json({
      status: 'ok',
      data: result.stores[0],
    });
  },
  async updateStore(req, res) {
    const {
      params: { id },
      body: store,
      user,
    } = req;

    const userStoreFilter = { username: user.username, 'stores._id': id };
    const allowedFields = ['name', 'address'];
    const setOperation = buildArraySetOperation('stores', store, allowedFields);
    const update = { $set: setOperation };

    const [result, updateError] = await promiseResolver(
      User.updateOne(userStoreFilter, update),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User store update: Update error.',
      });
    }

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User or store is not found.',
      });
    }

    return res.sendStatus(204);
  },
  async deleteStore(req, res) {
    const {
      params: { id },
      user,
    } = req;

    const userStoreFilter = { username: user.username, 'stores._id': id };
    const update = { $pull: { stores: { _id: id } } };

    const [result, updateError] = await promiseResolver(
      User.updateOne(userStoreFilter, update),
    );

    if (updateError) {
      return res.status(500).json({
        status: 'error',
        message: 'User store delete: Update error.',
      });
    }

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User or store is not found.',
      });
    }

    return res.sendStatus(204);
  },
};
