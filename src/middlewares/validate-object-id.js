const { isValidObjectId } = require('mongoose');

function validateObjectId(paramName) {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Object ID parameter.',
      });
    }

    return next();
  };
}

module.exports = validateObjectId;
