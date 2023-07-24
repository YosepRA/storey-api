const error = {
  serverError: {
    code: 'SERVER_ERROR',
    message: 'Server error. Please try again later.',
  },
  noDataFound: {
    code: 'NO_DATA_FOUND',
    message: 'There is no data found based on given parameters.',
  },
  userAlreadyExist: {
    code: 'USER_ALREADY_EXIST',
    message: 'User already exist',
  },
  notRegistered: {
    code: 'NOT_REGISTERED',
    message: 'You are not registered.',
  },
  wrongPassword: {
    code: 'WRONG_PASSWORD',
    message: 'Wrong password.',
  },
};

module.exports = error;
